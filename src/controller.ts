import Database from "better-sqlite3";
import path from "node:path";

export class Controller {
  private _db: Database.Database;

  constructor() {
    this._db = new Database(path.resolve("storage", "database.db"));
    this._db.pragma("foreign_keys = ON");
  }

  getHealth() {
    return "Working!";
  }

}

export const controller: Controller = new Controller();
