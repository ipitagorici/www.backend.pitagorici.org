import "../shared_kernel/ArrayExtensions"
import { IRassegneRepository } from '../application/repositories/IRassegneRepository';
import { IPhotosRepository } from '../application/repositories/IPhotosRepository';
import { ILocationRepository } from '../application/repositories/ILocationRepository';
import { IArticleRepository } from '../application/repositories/IArticleRepository';
import { SQLRassegneRepository } from '../infrastructure/repositories/sql/SQLRassegneRepository';
import { SQLPhotosRepository } from '../infrastructure/repositories/sql/SQLPhotosRepository';
import { SQLLocationRepository } from '../infrastructure/repositories/sql/SQLLocationRepository';
import { ISponsorMaterialRepository } from "../application/repositories/ISponsorMaterialRepository";
import { INewspaperRepository } from "../application/repositories/INewspaperRepository";
import 'dotenv/config'
import DefaultController from './controller/DefaultController';
import DefaultRouter from './routers/DefaultRouter';
import express from 'express'

const rassegneRepository: IRassegneRepository = new SQLRassegneRepository();
const photosRepository: IPhotosRepository = new SQLPhotosRepository();
const locationRepository: ILocationRepository = new SQLLocationRepository();
const articlesRepository: IArticleRepository = null;
const sponsoringMaterialRepository: ISponsorMaterialRepository = null;
const newspaperRepository: INewspaperRepository = null;

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