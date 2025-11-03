import { Request, Response } from 'express';

export const getChat = (req: Request, res: Response) => {
    const roomName = req.params.roomName;
    const username = req.query.username as string; 

    if (!username || username.trim() === '') {
        return res.redirect('/'); 
    }
    
    res.render('chat', { 
        roomName: roomName,
        username: username 
    });
};