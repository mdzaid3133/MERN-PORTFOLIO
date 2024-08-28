import express from 'express';
import { addSkillData,getSkillData,deleteSkill} from '../controllers/skill.controller.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/skill',upload.single('skillImage'),addSkillData);
router.get('/skill',getSkillData);
router.delete('/skill/:id',deleteSkill);

export default router;