// test/auth.test.js
import request from 'supertest';
import express from 'express';
import router from '../app/routes.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use('/', router);

describe('Pruebas del middleware JWT', () => {
    const validToken = jwt.sign({ id: 1, name: 'test' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    test('GET /admin sin token → 401', async () => {
        const res = await request(app).get('/admin');
        expect(res.statusCode).toBe(401);
        expect(res.body.mensaje).toMatch(/acceso denegado/i);
    });

    test('GET /admin con token inválido → 401', async () => {
        const res = await request(app).get('/admin').set('Authorization', 'Bearer token.fake');
        expect(res.statusCode).toBe(401);
        expect(res.body.mensaje).toMatch(/token incorrecto/i);
    });

    test('GET /admin con token válido → 200', async () => {
        const res = await request(app).get('/admin').set('Authorization', `Bearer ${validToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ mensaje: 'ok' });
    });
});
