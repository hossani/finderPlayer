import express from 'express';
import { sendMessageContact } from '../controllers/contact';

const router = express.Router();

router.post('/send', sendMessageContact);


export default router;
