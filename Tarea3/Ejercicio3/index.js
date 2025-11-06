import express from 'express';
import router from './app/routes.js';

const app = express();
app.use(express.json());
app.use('/', router);

app.listen(3000, () => console.log('Servidor con JWT en puerto 3000'));
export default app;
