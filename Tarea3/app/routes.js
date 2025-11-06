import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ mensaje: 'Acceso denegado. No se proporcionó token.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ mensaje: 'Token inválido. Formato incorrecto.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).send({ mensaje: 'Token inválido o expirado.' });
    }
};

router.get('/test', (req, res) => {
    res.status(200).send({ mensaje: 'ok' });
});

router.get('/admin', authMiddleware, (req, res) => {
    res.status(200).send({ mensaje: 'ok' });
});

export { router, authMiddleware, JWT_SECRET };
