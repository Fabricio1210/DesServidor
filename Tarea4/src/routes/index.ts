import { Router } from 'express';
import { getAllUsers } from './../controllers/user.controller';
import { sendSantaLetter } from './../controllers/email.controller';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '..', 'views', 'forms.html');
    res.sendFile(filePath);
});

router.get('/users', getAllUsers);
router.post('/send-santa-letter', sendSantaLetter);

export default router;