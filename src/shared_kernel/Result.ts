import { Error } from "./Error";

export class Result<TValue> {
  private value?: TValue;
  private error?: Error;

  public isSuccess(): boolean {
    return typeof this.value !== undefined && typeof this.error === undefined;
  }

  public isFailure(): boolean {
    return !this.isSuccess()
  } 

  public getValue(): TValue | undefined {
    return this.value;
  }

  public getError(): Error | undefined {
    return this.error;
  }

  public unpack(): [ TValue | undefined, Error | undefined ] {
    return [ this.value, this.error ]
  }
}