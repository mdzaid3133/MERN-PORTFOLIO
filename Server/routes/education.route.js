import express from 'express';
import { addEducationData,getEducationData,deleteEducation,} from '../controllers/education.controller.js';


const router = express.Router();

router.post('/education',addEducationData);
router.get('/education',getEducationData);
router.delete('/education/:id',deleteEducation)


export default router;