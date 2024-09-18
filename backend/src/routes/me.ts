import { Router } from "express";
import { db } from "../mongodb";
import { Flight } from "shared/types/flight";
import cors from "cors";
import bodyParser from "body-parser";

const router = Router();

router.use(bodyParser.json());
router.use(
  cors({
    origin: "*",
  })
);

router.post<{ flight: Flight }>("/flights", async (req, res) => {
  const database = await db();
  const collection = database.collection("booked-flights");

  if (!req.body.flight) {
    return res.status(400).send({ message: "Flight paremeter is required" });
  }

  const isFound = await collection.findOne({
    id: req.body.flight.id,
  });

  if (isFound) {
    return res.send({ message: "Already Booked" });
  }

  await collection.insertOne(req.body.flight);

  res.send({ message: "Successfully Booked the document" });
});

router.get("/flights", async (req, res) => {
  const database = await db();
  const collection = database.collection("booked-flights");

  const cursor = collection.find({})
  const array = await cursor.toArray()

  return res.send(array)
});

export { router };
