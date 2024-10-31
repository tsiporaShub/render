import express from 'express';
import checkAdminToken from '../middlewares/aouthenticatiom_admin.middleware';
import { get, put } from '../controllers/business.controller';

const router = express.Router();

router.get('/business', get);

router.put('/business', checkAdminToken, put);

export default router;
