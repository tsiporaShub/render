import { Request, Response } from 'express';
import user_model from '../models/user.model';

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config();

const secret_key = process.env.SECRET_KEY;

export const getAllUsers = async function (req: Request, res: Response) {
    const users = await user_model.find();
    res.send(users);
}


export const sign_up = async function (req: Request, res: Response) {
    try {
        const data = req.body;
        const thisUser = await user_model.findOne({ email: data.email });
        if (thisUser) {
            res.status(409).send('this user is exist')
            return;
        }
        const hasPassword = await bcrypt.hash(data.password, 10);
        const user = {
            id: data.id,
            name: data.name,
            password: hasPassword,
            email: data.email,
            phone: data.phone,
            isAdmin: data.isAdmin,
        };
        user_model.insertMany(user)
        res.send('sign up ' + user.id + ' succed');
    } catch (err) {
        res.status(409).send('error...')
    }
}


export const sign_in = async function (req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("missing details");
            return;
        }
        const user = await user_model.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password!))) {
            const token = "Bearer " + jwt.sign({ id: user.id, email, name: user.name, phone: user.phone, isAdmin: user.isAdmin },
                secret_key!, {
                expiresIn: "2h",
            }
            )
            res.status(200).json(token);
        } else {
            if (!user) {
                res.status(409).send("email not found");
            }
            else {
                res.status(409).send("incorrect password");
            }
        }
    } catch (err) {
        res.status(409).send('error...')
    }
}


export const updateUser = async function (req: Request, res: Response) {
    try {
        const data = req.body;
        const id = req.params.id;
        const thisUser = await user_model.findOne({ email: data.email });
        if (thisUser && thisUser.id != id) {
            res.status(409).send('this user is exist')
            return;
        }
        if (await user_model.findOne({ id }) === null) {
            res.status(404).send('user not found')
            return;
        }
        await user_model.updateOne({
            id
        }, {
            $set: {
                name: data.name,
                password: data.password,
                phone: data.phone,
                email: data.email,
            }
        })
        res.send('Update ' + id + ' succeeded');
    } catch (err) {
        res.status(409).send('error...')
    }
}


export const deleteUser = async function (req: Request, res: Response) {
    try {
        const id = req.params.id;
        if (await user_model.findOne({ id }) === null) {
            res.status(404).send('user package not found')
            return;
        }
        await user_model.deleteOne({ id });
        res.send('Delete ' + id + ' succeeded');
    } catch (err) {
        res.status(409).send('error...');
    }
}
