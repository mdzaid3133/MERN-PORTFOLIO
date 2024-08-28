
import express from 'express';
import{getResume,updateResume} from '../controllers/resume.controller.js';

import upload from '../middleware/multer.js';

const router = express.Router();

// router.post('/resume/upload',uploadResume);
router.get('/resume',getResume);
router.put('/resume/:id',upload.single('resumeImage'),updateResume);

export default router;