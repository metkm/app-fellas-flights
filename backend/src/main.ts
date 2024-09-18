import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { apiFetch } from "./api";
import { router as meRouter } from './routes/me'

const app = express();

app.use('/me', meRouter)

app.use(bodyParser.json())
app.use(
  cors({
    origin: "*",
  })
);

app.get("/flights", async (req, res) => {
  try {
    const response = await apiFetch("/flights", {
      params: req.query,
    });
    res.send(response || { flights: [] });
  } catch (err) {
    console.log((err as any).data);
    res.send(err);
  }
});

app.get("/airlines", async (_, res) => {
  try {
    const response = await apiFetch("/airlines");
    res.send(response);
  } catch (err) {
    console.log((err as any).data);
    res.send(err);
  }
});

app.listen(3050, () => {
  console.log("Listening on port 3050!");
});
