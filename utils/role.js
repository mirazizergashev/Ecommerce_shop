const Joi = require("joi")

const role = Joi.object().keys({
    id:Joi
    .number()
    .required()
    .messages({
        "string": "Butun son kirit !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!"
        }),

    name: Joi.string().
    min(1).
    max(100).
    required()
    .messages({
        "string.min": "Nom minimal 1 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Nom maksimal 100 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `Nom maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    status:Joi
    .number()
    .min(0)
    .max(1)
    .required()
    .messages({
        "string.min": "Status minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Status maksimal 1 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `Status maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),

   
});

const status = Joi.object().keys({
    id:Joi
    .number()
    .required()
    .messages({
        "string": "Butun son kirit !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!"
        }),

    name: Joi.string().
    min(1).
    max(100).
    required()
    .messages({
        "string.min": "Nom minimal 1 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Nom maksimal 100 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `Nom maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    class:Joi.string().
    min(1).
    max(45).
    required()
    .messages({
        "string.min": "Klass minimal 1 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Klass maksimal 100 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `Klass maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    status:Joi
    .number()
    .min(0)
    .max(1)
    .required()
    .messages({
        "string.min": "Status minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Status maksimal 1 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `Status maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),

   
});



module.exports = {
    
    role,status
}