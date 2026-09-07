import { Error } from "./Error";

abstract class Result {
  private error: Error;

  protected constructor(error: Error = Error.none) {
    this.error = error;
  }
  
  public isOK(): boolean {
    return this.error === Error.none;
  }

  public isFailure(): boolean {
    return !this.isOK()
  }

  public getError(): Error | undefined {
    return this.error;
  }
}

export class CommandResult extends Result {
  
}

export class QueryResult<TValue> extends Result {
  private value?: TValue;

  protected constructor(error: Error = Error.none, value?: TValue) {
    super(error);
    this.value = value;
  }
  
  public getValue(): TValue | undefined {
    return this.value;
  }
  
  public unpack(): {
    value?: TValue,
    error: Error
  } {
    return { value: this.getValue(), error: this.getError() } 
  }

  /**
  * Factory method to create a successful query result — wrapping no error and the `value` just calculated.
  */
  public static ok<TValue>(value: TValue): QueryResult<TValue> {
    return new QueryResult(Error.none, value)
  }

  /**
  * Factory method to create a query result representing a failure — 
  * wrapping the encountered error and the `value` just calculated (if any, otherwise set by default to `undefined`).
  */
  public static fail<TValue>(error: Error, value: TValue = undefined): QueryResult<TValue> {
    return new QueryResult(error, value)
  }
}
