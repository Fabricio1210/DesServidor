import { Router, json } from 'express';

import chatRoutes from './chat/routes'
import salasRoutes from './salas/routes'

const router = Router();

router.use(json());
router.use('/chat', chatRoutes)
router.use('/salas', salasRoutes)

export default router;
