import { Router } from "express";
import newsRoutes from './news/routes';
import topHeadlinesRoutes from './top_headlines/routes';
import sorcesRoutes from './sources/routes'

const router = Router();

router.use('/noticias',newsRoutes);
router.use('/top-headlines',topHeadlinesRoutes);
router.use('/top-headlines/sources',sorcesRoutes);

export default router;