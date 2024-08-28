import express from 'express';
import { updateHomeData,getHomeData} from '../controllers/home.controller.js';
import upload from '../middleware/multer.js';

// const cpUpload = upload.fields([{ name: 'homeImage', maxCount: 1 }, { name: 'resumeImage', maxCount: 1 }])

const router = express.Router();

router.put('/home/:id',upload.single('homeImage'),updateHomeData);
router.get('/home',getHomeData);

export default router;