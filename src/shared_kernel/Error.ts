import { ErrorTypes } from "./ErrorTypes";

export class Error {
  readonly description: string;
  readonly errorType: ErrorTypes;
  static readonly none: Error = new Error("", ErrorTypes.FAILURE); 

  private constructor(description: string, errorType: ErrorTypes) {
    this.description = description;
    this.errorType = errorType;
  }

  static failure(description: string) {
    return new Error(description, ErrorTypes.FAILURE);
  }

  static invalid(description: string) {
    return new Error(description, ErrorTypes.INVALID);
  }

  static notFound(description: string) {
    return new Error(description, ErrorTypes.NOT_FOUND);
  }
}