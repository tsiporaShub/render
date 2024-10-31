import { Request, Response } from 'express';

import { getAllPhotographyPackages, addPhotographyPackage, updatePhotographyPackage, deletePhotographyPackage } from '../services/photographyPackage.service';

export const get = async (req: Request, res: Response) => {    
    await getAllPhotographyPackages(req, res);
};

export const post = async (req: Request, res: Response) => {
    await addPhotographyPackage(req, res);
}

export const put = async (req: Request, res: Response) => {
    await updatePhotographyPackage(req, res);
}

export const deleteOne = async (req: Request, res: Response) => {
    await deletePhotographyPackage(req, res);
}
