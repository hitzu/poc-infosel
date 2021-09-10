import { Joi } from "../services/validation"

export const loginResquestSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().optional(),
});

export const loginResponseSchema = Joi.object().keys({
    userData: Joi.object().keys({
        _id: Joi.string().required(),
        status: Joi.boolean().required(),
        username: Joi.string().required(),
        loginDate: Joi.string().required(),
        createdAt: Joi.string().required(),
        updatedAt: Joi.string().required(),
        __v: Joi.string().optional(),
        personId: Joi.object().keys({
            _id: Joi.string().required(),
            phone: Joi.string().required(),
            rfc: Joi.string().required(),
            address: Joi.string().required(),
            createdAt: Joi.string().required(),
            __v: Joi.string().required(),
        }),
        accounts: Joi.array().items(
            Joi.object().keys({
                product: Joi.string().required(),
                balance: Joi.number().required(),
                status: Joi.string().required(),
                _id: Joi.string().required(),
                account_number: Joi.number().required(),
                personId: Joi.string().required(),
                createdAt: Joi.string().required(),
                updatedAt: Joi.string().required(),
                __v: Joi.string().required(),
            }),
        ),
    }),
    token : Joi.string().required(),
})

export type loginResponseType = typeof loginResquestSchema;
  