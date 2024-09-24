import express from 'express';
import authRoutes from './authRoute'; // Adjust the path as needed
import announcementsRoutes from './announceRoute'; // Adjust the path as needed
import friendshipsRoutes from './friendshipRoute'; // Adjust the path as needed
import messagesRoutes from './messageRoute'; // Adjust the path as needed
import responseRoutes from './responseRoute'; // Adjust the path as needed
import userRoutes from './userRoute'; // Adjust the path as needed
import locationRoute from './locationRoute'
import sportRoute from './sportRoute'
import contactRoute from './contactRoute'

const router = express.Router();

// Use the individual route files
router.use('/auth', authRoutes);
router.use('/announcements', announcementsRoutes);
router.use('/players', friendshipsRoutes);
router.use('/messages', messagesRoutes);
router.use('/response', responseRoutes);
router.use('/profile', userRoutes);
router.use('/sports', sportRoute);
router.use('/locations', locationRoute);
router.use('/contact', contactRoute);

export default router;
