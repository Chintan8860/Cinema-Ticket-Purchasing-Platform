import express from "express";

import mongoose, { ConnectOptions } from "mongoose";
import {
  createCinema,
  getCinemaList,
  purchaseConsecutiveSeats,
  purchaseSeat,
} from "./controller/cinemaController";

async function startServer(): Promise<void> {
  const app = express();
  app.use(express.json());

  // Connect to the MongoDB database
  // Must need to change DBUrl to connect Database
  await mongoose
    .connect(
      process.env.DBUrl ?? '',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      } as ConnectOptions
    )
    .then(() => {
      console.log("Connected to API Database - Initial Connection");
    })
    .catch((err) => {
      console.log(`Initial API Database connection error occured -`, err);
    });

  const port = 3000;
  //List all conema
  app.get("/cinemas", getCinemaList);
  // Create cinema
  app.post("/cinemas", createCinema);
  // Book cinema seat
  app.post("/cinemas/purchase/", purchaseSeat);
  // Find consecutive seat
  app.post("/cinemas/purchase/consecutive", purchaseConsecutiveSeats);

  app.get("*", (req, res) => {
    return res.send({ status: "true" });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start the server", error);
  process.exit(1);
});
