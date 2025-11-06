import express from "express";
import { router } from './app/routes.js';

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
app.use('/', router);

app.use(routes)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app;