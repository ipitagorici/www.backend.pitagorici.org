import { IRassegneRepository } from './application/repositories/IRassegneRepository';
import { IPhotosRepository } from './application/repositories/IPhotosRepository';
import { ILocationRepository } from './application/repositories/ILocationRepository';
import { SQLRassegneRepository } from './infrastructure/repositories/sql/SQLRassegneRepository';
import { SQLPhotosRepository } from './infrastructure/repositories/sql/SQLPhotosRepository';
import { SQLLocationRepository } from './infrastructure/repositories/sql/SQLLocationRepository';
import 'dotenv/config'
import { HTTPController } from './presentation/HTTPcontroller';
import express from 'express'

const rassegneRepository: IRassegneRepository = new SQLRassegneRepository()
const photosRepository: IPhotosRepository = new SQLPhotosRepository()
const locationRepository: ILocationRepository = new SQLLocationRepository()
const controller = new HTTPController(rassegneRepository, locationRepository, photosRepository);

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {    
    res.status(200).send({ status: controller.getHealth() });
});

const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
});