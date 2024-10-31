import express from 'express';
import checkAdminToken from '../middlewares/aouthenticatiom_admin.middleware';
import { get, signup, signin, put, deleteOne } from '../controllers/user.controller';

const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/user', checkAdminToken, get);

router.put('/user/:id', checkAdminToken, put);

router.delete('/user/:id', checkAdminToken, deleteOne);

export default router;