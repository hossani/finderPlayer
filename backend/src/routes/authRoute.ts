import express from 'express';
import { register, login } from '../controllers/auth'; // Adjust the path as needed

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

export default router;
