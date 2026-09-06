import { ErrorTypes } from "./ErrorTypes";

export class Error {
  readonly description: string;
  readonly errorType: ErrorTypes;
  
  private constructor(description: string, errorType: ErrorTypes) {
    this.description = description;
    this.errorType = errorType;
  }

  static makeFailure(description: string) {
    return new Error(description, ErrorTypes.FAILURE);
  }

  static makeInvalid(description: string) {
    return new Error(description, ErrorTypes.INVALID);
  }

  static makeNotFound(description: string) {
    return new Error(description, ErrorTypes.NOT_FOUND);
  }
}