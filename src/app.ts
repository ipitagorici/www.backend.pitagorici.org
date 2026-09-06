import 'dotenv/config'
import { controller } from "./controller"
import express from 'express'

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