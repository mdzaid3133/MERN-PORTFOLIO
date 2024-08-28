import express from 'express';
import login from '../controllers/auth.controller.js';

const router = express.Router(); // Use Router with a capital 'R'

router.post('/user/login', login);

export default router;
