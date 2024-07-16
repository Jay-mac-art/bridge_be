import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Errors } from '../constants';
import { failureResponse } from "../common/response";

require('dotenv').config();



export async function authenticateToken(req: any, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw Errors.userErrors.notLoginUser;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw Errors.userErrors.notLoginUser;
    }

    const decoded : any = jwt.verify(token, process.env.JWT_SECRET!) ;
    req.user = { id: decoded._id, email: decoded.email };
    next();
  } catch (error: any) {
    failureResponse(error.message, error, res);
  }
}
