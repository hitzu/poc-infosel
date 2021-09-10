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

export const enableDisableUserSchema = Joi.object().keys({})