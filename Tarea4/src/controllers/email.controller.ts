import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export function sendSantaLetter(req: Request, res: Response) {
    const { 
        santaEmail,
        letterContent
    } = req.body;
    
    const cleanedLetterContent = String(letterContent || '').trim();

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    let htmlContent = fs.readFileSync(
        path.join(__dirname, '..', 'views', 'emails', 'santa_letter.html'), 
        'utf8'
    );
    htmlContent = htmlContent.replace('{{carta_a_santa}}', cleanedLetterContent);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: santaEmail,
        subject: 'Carta para Santa Claus',
        text: `${cleanedLetterContent}`,
        html: htmlContent,
    };

    transporter.sendMail(mailOptions).then(response => {
        console.log('Carta enviada a Santa: ', response);
        res.send('Carta a Santa enviada exitosamente');
    }).catch(error => {
        console.error('Error al enviar la carta:', error); 
        res.status(500).send('Fallo el envío de la carta.');
    });
}