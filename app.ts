import express from "express";

import mongoose from "mongoose";

async function startServer(): Promise<void> {
  const app = express();
  app.use(express.json());

  // Connect to the MongoDB database
  // not creating any .env as file to store this link 
  await mongoose.connect(
    "mongodb+srv://testTask:testTasktestTask@cluster0.x2yeouv.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
    }
  );

  const port = 3001;

  const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start the server", error);
  process.exit(1);
});
