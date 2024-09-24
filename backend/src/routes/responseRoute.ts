import { Router } from 'express';
import { createResponse } from '../controllers/response';
import authMiddleware from '../middlewares/middlewareAuth';  // Assuming you have authentication middleware

const router = Router();

router.post('/:announceId', authMiddleware, createResponse);

export default router;
