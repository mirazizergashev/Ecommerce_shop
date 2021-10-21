const Joi = require("joi")

const dostavka = Joi.object().keys({
    id:Joi
    .number()
    .messages({
        "number": "Butun son kirit !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!"
        }),

    name: Joi.string().
    min(1).
    max(255).
    required()
    .messages({
        "string.min": "name minimal 1 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "name maksimal 255 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `name maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    cost:Joi
    .number()
    .min(0)
    .max(10000000)
    .required()
    .messages({
        "number.min": "foiz minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "number.max": "foiz maksimal 1000 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `foiz maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    isActive:Joi
    .number()
    .min(0)
    .max(2)
    .required()
    .messages({
        "number.min": "hol minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "number.max": "hol maksimal 2 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `hol maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
   

   
});


module.exports = {
     dostavka
}