import { Request, Response } from 'express';

import { getBusinessDetails, updateBusinessDetails } from '../services/business.service';

export const get = async (req: Request, res: Response) => {    
    await getBusinessDetails(req, res);
};

export const put = async (req: Request, res: Response) => {
    await updateBusinessDetails(req, res);
}
