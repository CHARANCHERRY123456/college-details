import express from 'express';
import { addOrUpdateFriend } from '../controllers/friendController.js';

const router = express.Router();

router.post('/add_friend', addOrUpdateFriend);

export default router;
