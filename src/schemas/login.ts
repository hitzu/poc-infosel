import { Joi } from "../services/validation"

export const loginResquestSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().optional(),
});

export const loginResponseSchema = Joi.object().keys({
    userData: Joi.object().keys({
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
        }),
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
        ),
    }),
    token : Joi.string().required(),
})
  