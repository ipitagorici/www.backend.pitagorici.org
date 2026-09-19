import { IPhotosRepository } from "../../../application/repositories/IPhotosRepository";
import { Foto } from "../../../domain/entities/Foto";
import { QueryResult } from "../../../shared_kernel/Result";
import { Error } from "../../../shared_kernel/Error";
import { FlickrGenericRepository, FlickrPhoto } from "./FlickrGenericRepository";

export default class FlickrPhotosRepository extends FlickrGenericRepository implements IPhotosRepository {

  public constructor(flickrAPIKey: string, flickrUserID: string, cacheTTL: number) { 
    super(flickrAPIKey, flickrUserID, cacheTTL);
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
  
  public async getByAlbumID(albumID: string): Promise<QueryResult<Foto[]>> {    
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
    const cover = this.findByTags(photos, ["cover"])[0]
    if (!cover) {
      return QueryResult.fail(Error.notFound("Could not find cover picture for album ID: " + albumID))
    }
    return QueryResult.ok(await this.flickrPhotoToPhotoMapper(cover, albumID))
  }
}