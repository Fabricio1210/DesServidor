import { Router } from "express";
import { renderSalas } from "./controller";

const router = Router()

router.get('', renderSalas);

export default router