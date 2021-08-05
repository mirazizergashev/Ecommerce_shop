const Joi = require("joi")

const product = Joi.object().keys({
    id: Joi
        .number()
        .required()
        .messages({
            "number": "Butun son kirit !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!"
        }),

    nom: Joi.string().
        min(1).
        max(255).
        required()
        .messages({
            "string.min": "Nom minimal 1 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
            "string.max": "Nom maksimal 255 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
            "any.required": `Nom maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
        }),
    izoh: Joi.string().
        min(1).
        max(255).
        required()
        .messages({
            "string.min": "Izoh minimal 1 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
            "string.max": "Izoh maksimal 255 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
            "any.required": `Izoh maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
        }),

    narx: Joi
        .number()
        .min(1)
        .required()
        .messages({
            "number.min": "Narx minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
            "any.required": `Narx maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
        }),
    son: Joi
        .number()
        .min(1)
        .max(100000000)
        .required()
        .messages({
            "number.min": "Son minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
            "number.max": "Son maksimal 10000000 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
            "any.required": `Son maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
        }),

    hol: Joi
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

const check_product = Joi.object().keys({
    product_id: Joi
        .number()
        .required()
        .messages({
            "number": "Butun son kirit !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!"
        }),

        izoh: Joi.string().
        min(1).
        max(255)
        .messages({
            "string.min": "Izoh minimal 1 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
            "string.max": "Izoh maksimal 255 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        }),


    hol: Joi
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



const product_properties = Joi.object().keys({
    id: Joi
        .number()
        .required()
        .messages({
            "number": "Butun son kirit !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!"
        }),

    product_id: Joi
        .number()
        .min(0)
        .max(10000000)
        .required()
        .messages({
            "number.min": "product_id minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
            "number.max": "product_id maksimal 10000000  ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
            "any.required": `product_id maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
        }),
    cat_prop_id: Joi
        .number()
        .min(0)
        .max(10000000)
        .required()
        .messages({
            "number.min": "Kategoriya xusuiyati id minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
            "number.max": "Kategoriya xusuiyati id maksimal 10000000 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
            "any.required": `Kategoriya xusuiyati id maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
        }),

    qiymat: Joi.string().
        min(1).
        max(255).
        required()
        .messages({
            "string.min": "Qiymat minimal 1 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
            "string.max": "Qiymat maksimal 255 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
            "string.required": `Qiymat maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
        }),

    hol: Joi
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
    product_properties,
    product,
    check_product
}