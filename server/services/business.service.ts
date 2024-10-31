import { Request, Response } from 'express';
import business_model from '../models/business.model';

export const getBusinessDetails = async function (req: Request, res: Response) {
    const businessDetails = await business_model.find();
    res.send(businessDetails);
}


export const updateBusinessDetails = async function (req: Request, res: Response) {
    try {
        const data = req.body;
        if (await business_model.findOne() === null) {
            res.status(404).send('business details not found')
            return;
        }
        await business_model.updateOne({}, {
            $set: {
                name: data.name,
                adress: data.adress,
                phone: data.phone,
            }
        })
        res.send('Update business details succeeded');
    } catch (err) {
        res.status(409).send('error...')
    }
}
