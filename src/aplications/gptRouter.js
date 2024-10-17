import { Router } from 'express';

const gptRouter = Router();

// Private
gptRouter.get("/", async (req, res) => {
  try {
    console.log("Accesing gpt");

    const returnJson = {
        algo: 1
    }
    // send if user is admin
    res.send(returnJson);
  } catch (err) {
    res.send(err);
  }
});

export default gptRouter;
