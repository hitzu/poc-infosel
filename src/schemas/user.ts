import { Joi } from "../services/validation"

export const getUserResquestSchema = Joi.object().keys({
    id: Joi.string().required(),
});

export const putUserRequestSchema = Joi.object().keys({
    person: Joi.object().keys({
        phone: Joi.string().required(),
        address: Joi.string().required(),
    }),
});

export const postUserRequestSchema = Joi.object().keys({
    user: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }).required(),
    person: Joi.object().keys({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
        rfc: Joi.string().required(),
    }).required(),
    account: Joi.object().keys({
        product: Joi.string().required(),
        nip: Joi.number().required(),
    }).required(),
});

export const enableDisableUserSchema = Joi.object().keys({});




// responses 

export const userResponseSchema = Joi.object().keys({
    _id: Joi.any().required(),
    status: Joi.boolean().required(),
    username: Joi.string().required(),
    personId: Joi.object().keys({
        _id: Joi.any().required(),
        phone: Joi.string().required(),
        rfc: Joi.string().required(),
        address: Joi.string().required(),
        createdAt: Joi.date().required(),
        __v: Joi.any().optional(),
    }).required(),
    loginDate: Joi.date().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    __v: Joi.any().optional(),
    accounts: Joi.array().items(
        Joi.object().keys({
            product: Joi.string().required(),
            balance: Joi.number().required(),
            status: Joi.boolean().required(),
            _id: Joi.any().required(),
            account_number: Joi.number().required(),
            personId: Joi.any().required(),
            createdAt: Joi.date().required(),
            updatedAt: Joi.date().required(),
            __v: Joi.any().optional(),
        }),
    ).required(),
});
