import { imageDimensionsFromStream } from "image-dimensions";
import { IPhotosRepository } from "../../../application/repositories/IPhotosRepository";
import { Foto } from "../../../domain/entities/Foto";
import { QueryResult } from "../../../shared_kernel/Result";
import { Error } from "../../../shared_kernel/Error";

type FlickrPhoto = {
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

export default class FlickrPhotosRepository implements IPhotosRepository {

  private cache: FlickrPhotoCache;
  
  public constructor(
    private flickrAPIKey: string,
    private flickrUserID: string,
    cacheTTL: number,
  ) { 
    this.cache = new FlickrPhotoCache(cacheTTL);
  }

  private flickrPictureUrlFormatter(server: string, id: string, secret: string): string {
    return `https://live.staticflickr.com/${server}/${id}_${secret}`
  }
  
  private flickrThumbPictureUrlFormatter(server: string, id: string, secret: string): string {
    return `${this.flickrPictureUrlFormatter(server, id, secret)}_t.jpg`
  }
  
  private flickrFullPictureUrlFormatter(server: string, id: string, secret: string): string {
    return `${this.flickrPictureUrlFormatter(server, id, secret)}_b.jpg`
  }

  private async calculatePictureDimensions(imageUrl: string): Promise<{width: number, height: number}> {
    const { body } = await fetch(imageUrl);
    const { width, height, type } = await imageDimensionsFromStream(body);
    const scaleFactor: number = 1024 / Math.max(width, height, 1);

    return { width: width * scaleFactor, height: height * scaleFactor }
  }

  private async flickrPhotoToPhotoMapper(flickrPhoto: FlickrPhoto, albumID: string): Promise<Foto> {
    const { server, id, secret, ...rest } = flickrPhoto;
    const fullImageUrl = this.flickrFullPictureUrlFormatter(server, id, secret)
    const thumbImageUrl = this.flickrThumbPictureUrlFormatter(server, id, secret)

    const { width, height } = await this.calculatePictureDimensions(thumbImageUrl)
    
    return {
      id: Number(id),
      larghezza: width,
      altezza: height,
      album_id: albumID,
      contenuto: fullImageUrl
    } as Foto;
  }

  private async getPhotos(albumID: string): Promise<Array<FlickrPhoto>> {
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

    const rawData = await fetch(requestURL)
    const photos = (await rawData.json())?.photoset?.photo ?? []; 
    this.cache.putIfAbsentOrExpired(albumID, photos)
    return photos
  }
  
  public async getByAlbumID(albumID: string): Promise<QueryResult<Array<Foto>>> {    
    let photos = []
    try {
      photos = await this.getPhotos(albumID)
    } catch (error) {
      return QueryResult.fail(Error.failure("Something went wrong when fetching the photos of album ID: " + albumID))
    }

    let result: Array<Foto> = []
    try {
      result = await Promise.all(
        photos.map(async (pic: FlickrPhoto) =>
          await this.flickrPhotoToPhotoMapper(pic, albumID)
        )
      );
    } catch (error) {
      return QueryResult.fail(Error.failure("Could not convert flickr photos!"))
    }

    return QueryResult.ok(result)
  }

  public async getRassegnaCoverByAlbumID(albumID: string): Promise<QueryResult<Foto>> {
    let photos = []
    try {
      photos = await this.getPhotos(albumID)
    } catch (error) {
      return QueryResult.fail(Error.failure("Something went wrong when fetching the photos of album ID: " + albumID))
    }
    const cover = photos.find(pic => pic.tags.includes("cover"))
    if (!cover) {
      return QueryResult.fail(Error.notFound("Could not find cover picture for album ID: " + albumID))
    }
    return QueryResult.ok(await this.flickrPhotoToPhotoMapper(cover, albumID))
  }
}