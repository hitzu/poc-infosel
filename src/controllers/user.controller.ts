import { Request, Response } from 'express';

const getUser = (req: Request, res: Response) : void => {
    try {
        res.status(200).send({hola : 'hola'});
    } catch (error) {
        res.status(500).send({hola : 'hola'});
    }
}

export {
    getUser
}