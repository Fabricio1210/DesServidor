import request from 'supertest';
import express from 'express';
import { router, authMiddleware, JWT_SECRET } from '../app/routes.js';
import jwt from 'jsonwebtoken';
import { sumar, restar, multiplicar, dividir } from '../app/operations/Utils.js';

const app = express();
app.use('/', router);

describe('Pruebas Unitarias para Operaciones', () => {
    test('La funcion sumar debe sumar dos numeros positivos correctamente', () => {
        expect(sumar(5, 10)).toBe(15);
    });

    test('La funcion sumar debe manejar numeros negativos', () => {
        expect(sumar(-5, 3)).toBe(-2);
        expect(sumar(-10, -5)).toBe(-15);
    });

    test('La funcion restar debe restar dos numeros correctamente', () => {
        expect(restar(20, 7)).toBe(13);
        expect(restar(5, 15)).toBe(-10);
    });

    test('La funcion multiplicar debe multiplicar dos numeros', () => {
        expect(multiplicar(8, 0)).toBe(0);
        expect(multiplicar(6, 4)).toBe(24);
    });

    test('La funcion dividir debe dividir dos numeros correctamente', () => {
        expect(dividir(100, 10)).toBe(10);
        expect(dividir(10, 4)).toBe(2.5);
    });

});

describe('Pruebas de Integracion para el endpoint /test', () => {
    test('GET /test debe responder con status 200 y { mensaje: "ok" }', async () => {
        const response = await request(app).get('/test');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ mensaje: 'ok' });
        expect(response.headers['content-type']).toMatch(/json/);
    });
});

describe('Pruebas de Integracion para el endpoint /admin (con Middleware)', () => {
    const validToken = jwt.sign({ id: 1, name: 'admin' }, JWT_SECRET, { expiresIn: '1h' });

    test('GET /admin debe responder 401 si no hay token', async () => {
        const response = await request(app).get('/admin');
        expect(response.statusCode).toBe(401);
        expect(response.body.mensaje).toMatch(/no se proporcionó token/i);
    });

    test('GET /admin debe responder 401 si el token es invalido', async () => {
        const invalidToken = 'este.es.un.token.invalido';
        const response = await request(app)
            .get('/admin')
            .set('Authorization', `Bearer ${invalidToken}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.mensaje).toMatch(/token inválido o expirado/i);
    });

    test('GET /admin debe responder 200 con token valido', async () => {
        process.env.NODE_ENV = 'test';
        const response = await request(app)
            .get('/admin')
            .set('Authorization', `Bearer ${validToken}`);
        process.env.NODE_ENV = 'development';
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ mensaje: 'ok' });
    });
});
