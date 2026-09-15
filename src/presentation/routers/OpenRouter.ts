import { Router, Response } from "express";
import OpenController from "../controllers/OpenController";
import { ErrorTypes } from "../../shared_kernel/ErrorTypes";
import { Error } from "../../shared_kernel/Error";

const fatal = (error: Error, response: Response): void => {
  response.status(error.errorType == ErrorTypes.NOT_FOUND ? 404 : 500);
  response.send({
    errorMessage: "An error has occurred! " + error.description
  });
}

export default function OpenRouter(controller: OpenController): Router {
  const router = Router()
  
  router.get("/health", (_, res) => {
    res.status(200).send({
      status: controller.getHealth()
    });
  });
  
  router.get("/past-events", async (_, res) => {
    const pastEvents = await controller.getPastRassegne()
    if (pastEvents.isFailure()) {
      fatal(pastEvents.getError(), res)
      return;
    }
    res.status(200).send(pastEvents.getValue())
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