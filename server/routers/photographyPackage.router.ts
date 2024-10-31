import express from 'express';
import checkAdminToken from '../middlewares/aouthenticatiom_admin.middleware';
import { get , post , put , deleteOne } from '../controllers/photographyPackage.controller';

const router = express.Router();

router.get('/PhotographyPackage',get);

router.post('/PhotographyPackage',checkAdminToken,post);

router.put('/PhotographyPackage/:id',checkAdminToken,put);

router.delete('/PhotographyPackage/:id',checkAdminToken,deleteOne);

export default router;