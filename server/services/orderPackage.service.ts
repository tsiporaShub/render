import { Request, Response } from 'express';
import orderPackage_model from '../models/orderPackage.model';
import photographyPackage_model from '../models/photographyPackage.model';

import date from 'date-and-time';
const datePattern = date.compile('YYYY/MM/DD')
const hourPattern = date.compile('hh:mm')

export const getAllOrderPackages = async function (req: Request, res: Response) {
    const orderPackages = await orderPackage_model.find();
    res.send(orderPackages);
}


export const addOrderPackage = async function (req: Request, res: Response) {
    try {
        const data = req.body;
        const newOrderPackage = {
            id: data.id,
            userId: data.userId,
            packageId: data.packageId,
            date: data.date,
            beginingHour: data.beginingHour,
            endHour: data.endHour,
        }
        await isCorrectorderPackage(newOrderPackage);
        try{
            await isAvailableTime(newOrderPackage);
        } catch (err) {
            res.status(400).send('' + err)
            return;
        }
        const orderPackages = await orderPackage_model.find();
        if (orderPackages.length === 0) {
            newOrderPackage.id = 0;
        }
        else {
            newOrderPackage.id = (orderPackages[orderPackages.length - 1]).id + 1;
        }
        await orderPackage_model.insertMany(newOrderPackage);
        res.send('Add new  order package succeeded');
    } catch (err) {
        res.status(409).send('' + err)
    }
}


export const updateOrderPackage = async function (req: Request, res: Response) {
    try {
        const data = req.body;
        const newOrderPackage = {
            id: data.id,
            userId: data.userId,
            packageId: data.packageId,
            date: data.date,
            beginingHour: data.beginingHour,
            endHour: data.endHour,
        }
        await isCorrectorderPackage(newOrderPackage);
        try{
            await isAvailableTime(newOrderPackage);
        } catch (err) {
            res.status(400).send('' + err)
            return;
        }
        const id = req.params.id;
        if (await orderPackage_model.findOne({ id }) === null) {
            res.status(404).send('order package not found')
            return;
        }
        await orderPackage_model.updateOne({
            id
        }, {
            $set: {
                packageId: data.packageId,
                date: data.date,
                beginingHour: data.beginingHour,
                endHour: data.endHour,
            }
        })
        res.send('Update ' + id + ' succeeded');
    } catch (err) {
        res.status(409).send('' + err)
    }
}


export const deleteOrderPackage = async function (req: Request, res: Response) {
    try {
        const id = req.params.id;
        if (await orderPackage_model.findOne({ id }) === null) {
            res.status(404).send('order package not found')
            return;
        }
        await orderPackage_model.deleteOne({ id });
        res.send('Delete ' + id + ' succeeded');
    } catch (err) {
        res.status(409).send('error...');
    }
}

const isCorrectorderPackage = async function (orderPackage: any) {
    if (isNaN(orderPackage.packageId)) {
        throw new Error("invalid packageId");
    }
    if (!await photographyPackage_model.findOne({ "id": orderPackage.packageId })) {
        throw new Error("packageId not found");
    }
    if (!date.isValid(orderPackage.date, datePattern)) {
        throw new Error('invalid date');
    }
    if (!date.isValid(orderPackage.beginingHour, hourPattern)) {
        throw new Error("invalid beginingHour");
    }
    if (!date.isValid(orderPackage.endHour, hourPattern)) {
        throw new Error("invalid endHour");
    }
    if (!(orderPackage.endHour > orderPackage.beginingHour)) {
        throw new Error("beginingHour big from endHour");
    }
    if (orderPackage.date < date.format(new Date(), datePattern)) {
        throw new Error("past date");
    }
}

const isAvailableTime = async function (orderPackage: any) {
    const allOrdersInThisDate = await orderPackage_model.find({ "date": orderPackage.date, "id": { $ne: orderPackage.id } });
    allOrdersInThisDate.sort((a: any, b: any) => { return a.beginingHour < b.beginingHour ? -1 : 1 });
    allOrdersInThisDate.forEach((order: any) => {
        if (order['endHour'] > orderPackage.beginingHour) {
            if (order['beginingHour'] < orderPackage.endHour) {
                throw new Error("the time is not available");
            }
        }
    });
}