import { Router } from "express";
import { getTopHeadlines } from "./controller";

const router = Router();

router.get("/", getTopHeadlines);

export default router;