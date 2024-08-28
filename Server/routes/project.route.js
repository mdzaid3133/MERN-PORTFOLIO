import express from 'express';
import { addProjectData,getProjectData,deleteProject,updatePorjectData} from '../controllers/project.controller.js';

import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/project',upload.single('projectImage'),addProjectData);
router.get('/project',getProjectData);
router.delete('/project/:id',deleteProject);
router.put('/project/:id',upload.single('projectImage'),updatePorjectData);

export default router;