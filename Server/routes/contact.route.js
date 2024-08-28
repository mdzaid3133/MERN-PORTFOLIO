
import express from 'express';
import{updateContactData,getContactData} from '../controllers/contact.controller.js';

const router = express.Router();

router.put('/contact/:id',updateContactData);
router.get('/contact',getContactData);

export default router;