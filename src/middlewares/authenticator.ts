import { decode } from '../services/token';
import { NextFunction, RequestHandler } from 'express';
import { RequestCustom } from "../interfaces/start-options.interface"

export const verifyToken = () : RequestHandler => { 
    return async (req: RequestCustom, _, next: NextFunction) => {
        try {
            req.thor = await decode(req.headers.authorization, req.clientIp);
            next();
        } catch (error) {
            next(error);
        }
    }
}