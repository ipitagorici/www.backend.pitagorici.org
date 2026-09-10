import "../shared_kernel/ArrayExtensions"
import { IRassegneRepository } from '../application/repositories/IRassegneRepository';
import { IPhotosRepository } from '../application/repositories/IPhotosRepository';
import { ILocationRepository } from '../application/repositories/ILocationRepository';
import { IArticleRepository } from '../application/repositories/IArticleRepository';
import { SqliteRassegneRepository } from '../infrastructure/repositories/sqlite/SqliteRassegneRepository';
import { SqlitePhotosRepository } from '../infrastructure/repositories/sqlite/SqlitePhotosRepository';
import { SqliteLocationRepository } from '../infrastructure/repositories/sqlite/SqliteLocationRepository';
import { ISponsorMaterialRepository } from "../application/repositories/ISponsorMaterialRepository";
import { INewspaperRepository } from "../application/repositories/INewspaperRepository";
import 'dotenv/config'
import DefaultController from './controllers/DefaultController';
import DefaultRouter from './routers/DefaultRouter';
import express from 'express'
import Database, { Database as SqliteDatabase } from "better-sqlite3";
import path from "node:path";
import { SqliteArticleRepository } from "../infrastructure/repositories/sqlite/SqliteArticleRepository";
import { SqliteSponsorMaterialRepository } from "../infrastructure/repositories/sqlite/SqliteSponsorMaterialRepository";
import { SqliteNewspaperRepository } from "../infrastructure/repositories/sqlite/SqliteNewspaperRepository";
import { exit } from "node:process";

const DB_FILENAME = "database.db";
const DB_PATH: string = path.resolve(__dirname, "../../storage/", DB_FILENAME)

let database: SqliteDatabase = null;
try {
  database = new Database(DB_PATH);
} catch (Error) {
  console.error("Something went wrong while trying to connect to database! Exiting...")
  exit(1)
}

database.pragma('journal_mode = WAL');
database.pragma('foreign_keys = ON');

const rassegneRepository: IRassegneRepository = new SqliteRassegneRepository(database);
const photosRepository: IPhotosRepository = new SqlitePhotosRepository(database);
const locationRepository: ILocationRepository = new SqliteLocationRepository(database);
const articlesRepository: IArticleRepository = new SqliteArticleRepository(database);
const sponsoringMaterialRepository: ISponsorMaterialRepository = new SqliteSponsorMaterialRepository(database);
const newspaperRepository: INewspaperRepository = new SqliteNewspaperRepository(database);

const defaultController = new DefaultController(
  rassegneRepository,
  locationRepository,
  photosRepository,
  articlesRepository,
  sponsoringMaterialRepository,
  newspaperRepository
);

const app = express();
const BASE_URL = "/api";
// const PROTECTED_ROUTE = BASE_URL + "/matematici"

// Middlewares & Routers
app.use(express.json());
app.use(BASE_URL, DefaultRouter(defaultController))
// app.use(PROTECTED_ROUTE, ProtectedRouter(protectedController))

const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`)
});