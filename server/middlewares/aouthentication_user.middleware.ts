import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;

const checkToken = (req: Request, res: Response, next: () => any) => {
  let token = req.body.token || req.query.token || req.headers.token;
  if (!token) {
    return res.status(403).send('A token is required for authen');
  }
  try {
    token=token.slice(7);
    jwt.verify(token, SECRET_KEY!);
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
}

export default checkToken;