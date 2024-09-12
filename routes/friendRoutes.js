import express from 'express';
import { addFriend } from '../controllers/friendController.js';

const router = express.Router();

router.post('/add_friend', addFriend);

export default router;
