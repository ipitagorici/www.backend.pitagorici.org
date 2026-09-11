/**
 * Retrieves the metadata from the image specified by URL. 
 * Useful to handle some asynchronous operations.
 *  
 * @param {string} url the url of the image to load
 * @param {Function} callback the callback to run in case of error or when the image loads successfully 
 */
export function getImageMetadata(url: string, callback: (error?: string | Event, image?: HTMLImageElement) => void): void {
  const img = new Image();
  img.src = url;
  img.onload = () => callback(null, img);
  img.onerror = (error) => callback(error);
}