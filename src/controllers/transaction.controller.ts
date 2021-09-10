import { Response } from 'express';
import { RequestCustom } from '@interfaces/start-options.interface';

const tranfer = async (req: RequestCustom, res: Response) => {
    try {
        console.log(req.thor);
        res.status(200).send({ operation: 'transfer'});
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const deposit = async (req: RequestCustom, res: Response) => {
    try {
        console.log(req.thor);
        res.status(200).send({ operation: 'deposit'});
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

export {
    tranfer,
    deposit
}