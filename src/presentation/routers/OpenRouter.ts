import { Router, Response } from "express";
import DefaultController from "../controllers/DefaultController";
import { ErrorTypes } from "../../shared_kernel/ErrorTypes";
import { Error } from "../../shared_kernel/Error";

const fatal = (error: Error, response: Response): void => {
  response.status(error.errorType == ErrorTypes.NOT_FOUND ? 404 : 500);
  response.send({
    errorMessage: "An error has occurred! " + error.description
  });
}

export default function OpenRouter(controller: DefaultController): Router {
  const router = Router()
  
  router.get("/health", (_, res) => {
    res.status(200).send({
      status: controller.getHealth()
    });
  });
  
  router.get("/past-events", (_, res) => {
    const pastEvents = controller.getPastRassegne()
    if (pastEvents.isFailure()) {
      fatal(pastEvents.getError(), res)
      return;
    }
    res.status(200).send({
      pastEvents: pastEvents.getValue()
    })
  })
  
  router.get("/random-photos", async (req, res) => {
    const amountRequired: number = Number(req.query.amount)
    const randomPhotos = await controller.getRandomPhotos(amountRequired)
    if (randomPhotos.isFailure()) {
      fatal(randomPhotos.getError(), res);
      return;
    }
    res.status(200).send({
      randomPhotos: randomPhotos.getValue()
    })
  })
  
  router.get("/all-articles", (_, res) => {
    const articles = controller.getArticles();
    if (articles.isFailure()) {
      fatal(articles.getError(), res);
      return;
    }
    res.status(200).send(articles.getValue())
  })
  
  router.get("/next-events", (_, res) => {
    const nextEvents = controller.getScheduledRassegne();
    if (nextEvents.isFailure()) {
      fatal(nextEvents.getError(), res);
      return;
    }
    res.status(200).send({
      events: nextEvents.getValue()
    })
  })

  router.get("/past-event/:id", async (req, res) => {
    const pastEventID: number = Number(req.params.id);
    const event = await controller.getPastRassegnaWithPhotos(pastEventID);
    if (event.isFailure()) {
      fatal(event.getError(), res);
      return;
    }
    res.status(200).send(event.getValue())
  })
  
  return router
}