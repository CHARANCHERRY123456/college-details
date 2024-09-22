import express from 'express';
import { getUserProfile, updateUserDetails, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Route to get user profile
router.get('/profile', getUserProfile);

// Route to update user details
router.post('/update', updateUserDetails);

// Route to delete user
router.post('/delete', deleteUser);

export default router;
