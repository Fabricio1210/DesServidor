import { Router } from "express";
import * as chatController from "./controller";

const router = Router();
router.get('/:roomName', chatController.getChat);

export default router;