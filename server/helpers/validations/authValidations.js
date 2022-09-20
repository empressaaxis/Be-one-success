import Joi from 'joi';

export const validateSignUp = (user) => {
    const schema = Joi.object().keys({
        names: Joi.string().required().min(2),
        phone: Joi.string().required().min(10),
        email: Joi.string().email().required(),
        password: Joi.string().min(8),
        type: Joi.string().required(),
    });

    return schema.validate(user)
}



