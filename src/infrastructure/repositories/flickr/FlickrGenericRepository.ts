import { imageDimensionsFromStream } from "image-dimensions";

export type FlickrPhoto = {
  id: string,
  secret: string,
  server: string,
  farm: number,
  title: string,
  isprimary: string,
  ispublic: number,
  isfriend: number,
  isfamily: number,
  tags: string
} 

type FlickrPhotoCacheItem = { insertedAt: Date, photos: Array<FlickrPhoto> };

class FlickrPhotoCache {

  private readonly TTL: number;
  private cache: Map<string, FlickrPhotoCacheItem> 

  constructor(ttl: number) {
    this.cache = new Map();
    this.TTL = ttl;
  }

  private hasExpired(albumID: string): boolean {
    if (!this.cache.has(albumID)) {
      return false;
    }
    const now = new Date()
    const item = this.cache.get(albumID)
    return now.differenceInSeconds(item.insertedAt) >= this.TTL
  }
  
  public putIfAbsentOrExpired(albumID: string, photos: Array<FlickrPhoto>) {
    const now = new Date()
    const newItem: FlickrPhotoCacheItem = { insertedAt: now, photos };
    if (!this.cache.has(albumID)) {
      this.cache[albumID] = newItem;
      return;
    }
    if (this.hasExpired(albumID)) {
      this.cache[albumID] = newItem;
    }
  }

  public canUse(albumID: string): boolean {
    return this.cache.has(albumID) && !this.hasExpired(albumID);
  }

  public get(albumID: string): Array<FlickrPhoto> {
    return this.cache.get(albumID)?.photos ?? []
  }
}

export abstract class FlickrGenericRepository {
  
  protected cache: FlickrPhotoCache;
  
  public constructor(
    protected flickrAPIKey: string,
    protected flickrUserID: string,
    cacheTTL: number,
  ) { 
    this.cache = new FlickrPhotoCache(cacheTTL);
  }

  protected flickrPictureUrlFormatter(server: string, id: string, secret: string): string {
    return `https://live.staticflickr.com/${server}/${id}_${secret}`
  }
  
  protected flickrThumbPictureUrlFormatter(server: string, id: string, secret: string): string {
    return `${this.flickrPictureUrlFormatter(server, id, secret)}_t.jpg`
  }
  
  protected flickrFullPictureUrlFormatter(server: string, id: string, secret: string): string {
    return `${this.flickrPictureUrlFormatter(server, id, secret)}_b.jpg`
  }

  protected async calculatePictureDimensions(imageUrl: string): Promise<{width: number, height: number}> {
    const { body } = await fetch(imageUrl);
    const { width, height, type } = await imageDimensionsFromStream(body);
    const scaleFactor: number = 1024 / Math.max(width, height, 1);

    return { width: width * scaleFactor, height: height * scaleFactor }
  }

  protected async getPhotos(albumID: string): Promise<Array<FlickrPhoto>> {
    if (this.cache.canUse(albumID)) {
      return new Promise(() => { return this.cache.get(albumID)})
    }
    const baseURL = "https://www.flickr.com/services/rest/?";
    const requestURL = baseURL
      .concat(`method=flickr.photosets.getPhotos&`)
      .concat(`api_key=${this.flickrAPIKey}&`)
      .concat(`photoset_id=${albumID}&`)
      .concat(`user_id=${this.flickrUserID}&`)
      .concat(`extras=tags&`)
      .concat(`format=json&`)
      .concat(`nojsoncallback=1`)

    const rawData = await fetch(requestURL);
    const photos = ((await rawData.json())?.photoset?.photo ?? []) as FlickrPhoto[]; 
    this.cache.putIfAbsentOrExpired(albumID, photos);
    return photos
  }

  protected findByTags(photos: FlickrPhoto[], tags: string[]): FlickrPhoto[] {
    return photos.filter(photo => tags.some(tag => photo.tags.includes(tag)))
  } 
}