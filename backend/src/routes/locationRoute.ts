import express from 'express';
import { getLocationById, getLocations } from '../controllers/location';
const router = express.Router();

router.get('/', getLocations);
router.get('/:locationId', getLocationById);


export default router;
