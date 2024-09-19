import { Router } from "express";
import { db } from "../mongodb";
import { FlightArrival, FlightDeparture } from "shared/types/flight";
import cors from "cors";
import bodyParser from "body-parser";

const router = Router();

router.use(bodyParser.json());
router.use(
  cors({
    origin: "*",
  })
);

router.post<{ flight: FlightArrival | FlightDeparture }>("/flights", async (req, res) => {
  const database = await db();
  const collection = database.collection("booked-flights");

  if (!req.body.flight) {
    return res.status(400).send({ message: "Flight paremeter is required" });
  }

  if (req.body.flight?.flightDirection !== "D") {
    return res.status(400).send({ message: "Only departure flights can be booked!" });
  }

  const isFound = await collection.findOne({
    id: req.body.flight.id,
  });

  if (isFound) {
    return res.status(409).send({ message: "Already Booked" });
  }

  await collection.insertOne(req.body.flight);

  res.send({ message: "Successfully Booked the flight" });
});

router.get("/flights", async (req, res) => {
  const database = await db();
  const collection = database.collection("booked-flights");

  const cursor = collection.find({})
  const array = await cursor.toArray()

  return res.send(array)
});

export { router };
