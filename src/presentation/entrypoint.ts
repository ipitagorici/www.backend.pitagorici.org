import "@/shared_kernel/ArrayExtensions"
import "@/shared_kernel/DateExtensions"
import { IRassegneRepository } from '@/application/repositories/IRassegneRepository';
import { IPhotosRepository } from '@/application/repositories/IPhotosRepository';
import { ILocationRepository } from '@/application/repositories/ILocationRepository';
import { IArticleRepository } from '@/application/repositories/IArticleRepository';
import { SqliteRassegneRepository } from '@/infrastructure/repositories/sqlite/SqliteRassegneRepository';
import { SqliteAlbumRepository } from '@/infrastructure/repositories/sqlite/SqliteAlbumRepository';
import { SqliteLocationRepository } from '@/infrastructure/repositories/sqlite/SqliteLocationRepository';
import { ISponsorMaterialRepository } from "@/application/repositories/ISponsorMaterialRepository";
import { INewspaperRepository } from "@/application/repositories/INewspaperRepository";
import 'dotenv/config'
import cors from "cors"
import OpenController from './controllers/OpenController';
import OpenRouter from './routers/OpenRouter';
import express from 'express'
import Database, { Database as SqliteDatabase } from "better-sqlite3";
import path from "node:path";
import { SqliteArticleRepository } from "@/infrastructure/repositories/sqlite/SqliteArticleRepository";
import { SqliteNewspaperRepository } from "@/infrastructure/repositories/sqlite/SqliteNewspaperRepository";
import { env, exit } from "node:process";
import FlickrPhotosRepository from "@/infrastructure/repositories/flickr/FlickrPhotosRepository";
import { IAlbumRepository } from "@/application/repositories/IAlbumRepository";
import SqliteSponsorMaterialRepository from "@/infrastructure/repositories/sqlite/SqliteSponsorMaterialRepository";
import { ISponsorsRepository } from "@/application/repositories/ISponsorsRepository";
import SqliteSponsorRepository from "@/infrastructure/repositories/sqlite/SqliteSponsorRepository";

const main = () => {
  
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
  
  const TTLSeconds = 60 * 60; // 1-hour cache
  const photosRepository: IPhotosRepository = new FlickrPhotosRepository(
    env.FLICKR_API_KEY,
    env.FLICKR_USER_ID,
    TTLSeconds
  );
  const rassegneRepository: IRassegneRepository = new SqliteRassegneRepository(database);
  const albumRepository: IAlbumRepository = new SqliteAlbumRepository(database);
  const locationRepository: ILocationRepository = new SqliteLocationRepository(database);
  const articlesRepository: IArticleRepository = new SqliteArticleRepository(database);
  const sponsoringMaterialRepository: ISponsorMaterialRepository = new SqliteSponsorMaterialRepository(database);
  const newspaperRepository: INewspaperRepository = new SqliteNewspaperRepository(database);
  const sponsorsRepository: ISponsorsRepository = new SqliteSponsorRepository(database);
  
  const openController = new OpenController(
    rassegneRepository,
    locationRepository,
    albumRepository,
    photosRepository,
    articlesRepository,
    sponsoringMaterialRepository,
    newspaperRepository,
    sponsorsRepository
  );
  
  const app = express();
  const BASE_URL = "/api";
  // const PROTECTED_ROUTE = BASE_URL + "/matematici"
  
  // Middlewares & Routers
  app.use(express.json());
  app.use(cors());
  app.use(BASE_URL, OpenRouter(openController))
  // app.use(PROTECTED_ROUTE, ProtectedRouter(protectedController))
  
  const DEFAULT_PORT = 3000;
  const port = process.env.PORT || DEFAULT_PORT;

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`)
  });
}

main();