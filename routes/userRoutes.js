import express from 'express';
import { takeDetails, addFriend } from '../controllers/userController.js';

const router = express.Router();

router.get('/take_details', takeDetails);
router.post('/add_friend', addFriend);

export default router;
