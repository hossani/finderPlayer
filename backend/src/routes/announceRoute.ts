import express from 'express';
import { createAnnounce, getFilteredEvents, getAnnounceById } from '../controllers/announce'; // Adjust the path as needed
import authMiddleware from '../middlewares/middlewareAuth';

const router = express.Router();

router.post('/',authMiddleware, createAnnounce);
router.get('/filteredEvents', getFilteredEvents);
router.get('/:eventID', getAnnounceById);


export default router;
