import { Joi } from "../services/validation"

export const postTransactionTransferResquestSchema = Joi.object().keys({
    
});

export const postTransactionDepositRequestSchema = Joi.object().keys({
    "receivedAccount" : Joi.string().required(),
    "movementype": Joi.string().required(),
    "amount" : Joi.number().required(),
    "concept" : Joi.string().required(),
    "reference" : Joi.string().required(),
    "operation" : Joi.string().required(),
    "status" : Joi.string().required(),
});

export const postTransactionTransferRequestSchema = Joi.object().keys({
    "receivedAccount" : Joi.string().required(),
    "originAccount" : Joi.string().required(),
    "movementype": Joi.string().required(),
    "amount" : Joi.number().required(),
    "concept" : Joi.string().required(),
    "reference" : Joi.string().required(),
    "operation" : Joi.string().required(),
    "status" : Joi.string().required(),
});

export const postTransactionResponseSchema = Joi.object().keys({
    message: Joi.string().required(),
})

  