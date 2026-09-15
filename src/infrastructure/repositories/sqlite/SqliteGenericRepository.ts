import Database, { Database as SqliteDatabase } from "better-sqlite3";
import { QueryResult } from "../../../shared_kernel/Result";
import { Error } from "../../../shared_kernel/Error";

export default class SqliteGenericRepository {

  public constructor(private database: SqliteDatabase) { }
  
  public get<T>(query: string, ...params: any[]): QueryResult<T> {
    const command = this.database.prepare(query);
    try {
      const result = params ? command.get(...params) : command.get()
      if (!result) {
        return QueryResult.fail(Error.failure("Something went wrong when querying with the following parameters: " + {...params}))
      }
      return QueryResult.ok(result as T)
    } catch (error) {
      return QueryResult.fail(Error.failure("Something went wrong when trying to execute command with the following parameters: " + {...params}))
    }
  }
  
  public getMany<T>(query: string, ...params: any[]): QueryResult<T[]> {
    const command = this.database.prepare(query);
    try {
      const result = params ? command.all(...params) : command.all()
      if (!result) {
        return QueryResult.fail(Error.failure("Something went wrong when querying with the following parameters: " + {...params}))
      }
      return QueryResult.ok(result as T[])
    } catch (error) {
      return QueryResult.fail(Error.failure("Something went wrong when trying to execute command with the following parameters: " + {...params}))
    }
  }
}