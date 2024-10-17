import { Router } from 'express';
import gptRouter from "./aplications/gptRouter.js";

const router = Router();

// Rutas para otras partes de la aplicación
router.use("/gpt", gptRouter);

export default router;