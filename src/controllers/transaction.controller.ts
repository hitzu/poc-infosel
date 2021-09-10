import { Response } from 'express';
import { RequestCustom } from '../interfaces/start-options.interface';
import AccountModel from "../models/account/account.model"
import transactionModel from '../models/transactions/transaction.model'
import { validate } from "../services/validation"
import {
    postTransactionResponseSchema
} from "../schemas";

const tranfer = async (req: RequestCustom, res: Response) => {
    try {
        const {person_id, user_id} = req.thor
        const {
            receivedAccount,
            originAccount,
            amount,
        } = req.body;

        const checkSalary = await AccountModel.findById(originAccount);
        if(checkSalary.balance < amount) {
            throw new Error('Balance insuficiente para transferencia');
        }

        const updateAccoundReceivedModel = AccountModel.findOneAndUpdate(
            {_id: receivedAccount},
            {$inc : {balance : amount}, $set: {updatedAt: new Date()}},
            {new : true}
        );
        const updateAccountOriginModel = AccountModel.findOneAndUpdate(
            {personId: person_id, _id: originAccount},
            {$inc : {balance : -amount}, $set: {updatedAt: new Date()}},
            {new : true}
        );
        const transaction = {
            ...req.body,
            userId: user_id,
            personId: person_id,
        }
        const createTransaction = transactionModel.create(transaction)
        await Promise.all([updateAccoundReceivedModel, updateAccountOriginModel, createTransaction])
        const finalResponse = {message: "Transferencia correcta"}
        await validate(finalResponse, postTransactionResponseSchema)
        res.status(200).send(finalResponse);
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const deposit = async (req: RequestCustom, res: Response) => {
    try {
        const {person_id, user_id} = req.thor
        const {
            receivedAccount,
            amount,
        } = req.body;
        const updateModel = AccountModel.findOneAndUpdate(
            {personId: person_id, _id: receivedAccount},
            {$inc : {balance : amount}, $set: {updatedAt: new Date()}},
            {new : true}
        );
        const transaction = {
            ...req.body,
            userId: user_id,
            personId: person_id,
        }
        const createTransaction = transactionModel.create(transaction)
        await Promise.all([updateModel, createTransaction])
        const finalResponse = {message: "Deposito correcto"}
        await validate(finalResponse, postTransactionResponseSchema)
        res.status(200).send(finalResponse);
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

export {
    tranfer,
    deposit
}