import express from 'express';
import { getSportById, getSports } from '../controllers/sport';
const router = express.Router();


router.get('/', getSports);
router.get('/:sportId', getSportById);

export default router;
