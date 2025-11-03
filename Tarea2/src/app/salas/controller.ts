import { Request, Response } from "express";

const AVAILABLE_ROOMS: string[] = ['General', 'Videojuegos', 'Memes'];

export function renderSalas(req: Request, res: Response) {
    const username = req.query.username as string;

    if (!username || username.trim() === '') {
        return res.redirect('/'); 
    }

    res.render('salas', { 
        rooms: AVAILABLE_ROOMS,
        username: username
    });
}