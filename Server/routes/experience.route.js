import express from 'express';
import {addExperiences,getExperiences,deleteExperiences,updateExperienceData} from '../controllers/experience.controller.js';

import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/experience',upload.single('expImage'),addExperiences);
router.get('/experience',getExperiences);
router.delete('/experience/:id',deleteExperiences);
router.put('/experience/:id', upload.single('expImage'),updateExperienceData);

export default router;