import { imageDimensionsFromStream } from "image-dimensions";
import { IPhotosRepository } from "../../../application/repositories/IPhotosRepository";
import { Foto } from "../../../domain/entities/Foto";

type FlickrPhoto = {
  id: string,
  secret: string,
  server: string,
  farm: number,
  title: string,
  isprimary: string,
  ispublic: number,
  isfriend: number,
  isfamily: number
} 

export default class FlickrPhotosRepository implements IPhotosRepository {

  public constructor(
    private flickrAPIKey: string,
    private flickrUserID: string
  ) { }

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
      altezza: height,
      larghezza: width,
      album_id: albumID,
      contenuto: fullImageUrl
    } as Foto;
  }
  
  public async getByAlbumID(albumID: string): Promise<Array<Foto>> {    
    const baseURL = "https://www.flickr.com/services/rest/?";
    const requestURL = baseURL
      .concat(`method=flickr.photosets.getPhotos&`)
      .concat(`api_key=${this.flickrAPIKey}&`)
      .concat(`photoset_id=${albumID}&`)
      .concat(`user_id=${this.flickrUserID}&`)
      .concat(`format=json&`)
      .concat(`nojsoncallback=1`)

    const rawData = await fetch(requestURL)
    const jsonData = await rawData.json()
    
    let result: Array<Foto> = await Promise.all(
      jsonData.photoset.photo.map(async (pic: FlickrPhoto) =>
        await this.flickrPhotoToPhotoMapper(pic, albumID)
      )
    );

    return result
  }
  
  public async getRandom(quantity: number): Promise<Array<Foto>> {
    throw new Error("Method not implemented.");
  }
  
}