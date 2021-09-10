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
    person:Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phone: Joi.string().required(),
        rfc: Joi.string().required(),
        address: Joi.string().required(),
    }),
    user: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
    account: Joi.object().keys({
        product: Joi.string().required(),
        nip: Joi.string().required(),
    }),
})