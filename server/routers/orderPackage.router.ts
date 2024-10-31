import express from 'express';
import { get, post, put, deleteOne } from '../controllers/orderPackage.controller';
import checkUserToken from '../middlewares/aouthentication_user.middleware';
import checkAdminToken from '../middlewares/aouthenticatiom_admin.middleware';

const router = express.Router();

router.get('/OrderPackage', checkUserToken, get);

router.post('/OrderPackage', checkUserToken, post);

router.put('/OrderPackage/:id', checkAdminToken, put);

router.delete('/OrderPackage/:id', checkAdminToken, deleteOne);

export default router;