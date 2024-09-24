import express from 'express';
import { changeEmail, changePassword, deleteAccount, forgetPasswordAuth, getFilteredPlayers,getNewPlayer, getUserById, updateUserProfile } from '../controllers/user'; // Adjust the path as needed
import authMiddleware from '../middlewares/middlewareAuth';

const router = express.Router();

router.get('/filteredPlayers',authMiddleware,  getFilteredPlayers);
router.get('/', authMiddleware,getUserById);
router.delete('/', authMiddleware,deleteAccount);
router.get('/:userId', authMiddleware,getNewPlayer);
// Route to update user profile
router.patch('/', authMiddleware,updateUserProfile);
router.patch('/changePassword', authMiddleware,changePassword);
router.patch('/changeEmail', authMiddleware,changeEmail);
router.patch('/recoverAccountUserAuth', authMiddleware,forgetPasswordAuth);

export default router;
