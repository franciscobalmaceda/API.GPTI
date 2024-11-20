import { Router } from 'express';
import gptRouter from "./aplications/gptRouter.js";
import organizationRouter from './aplications/organizationRouter.js';

const router = Router();

// Rutas para otras partes de la aplicación
router.use("/gpt", gptRouter);
router.use("/organization", organizationRouter);

export default router;