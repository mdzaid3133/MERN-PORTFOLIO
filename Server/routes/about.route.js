import express from 'express';
import { updateAboutData, getAboutData } from '../controllers/about.controller.js'; 

import upload from '../middleware/multer.js';

const router = express.Router();

router.put('/about/:id', upload.single('aboutImage'), updateAboutData);
router.get('/about', getAboutData);

export default router;