import request from 'supertest';
import app from '../index.js';

describe('Pruebas del endpoint /test', () => {
    test('GET /test debe responder 200 y mensaje ok', async () => {
        const response = await request(app).get('/test');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ mensaje: 'ok' });
    });
});

