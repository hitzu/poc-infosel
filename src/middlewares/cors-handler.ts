import { NextFunction, Request, RequestHandler, Response, Send } from 'express';

export const corsHandler = (): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader(
          'Access-Control-Allow-Headers',
          'X-Amz-Date, Content-Type, Authorization, X-Api-Key, X-Amz-Security-Token, X-Amz-User-Agent, odin, loki, thor'
        );
    
        next();
    }
}