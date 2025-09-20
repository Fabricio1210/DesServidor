import { Router } from "express";
import { getSources } from "./controller";

const router = Router();

router.get("/", getSources);

export default router;