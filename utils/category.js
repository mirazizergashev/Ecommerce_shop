const Joi = require("joi")

const category = Joi.object().keys({
    id:Joi
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
    sub:Joi
    .number()
    .min(0)
    .max(10000000)
    .required()
    .messages({
        "number.min": "sub minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "number.max": "sub maksimal 10000000  ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `sub maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    // user_id:Joi
    // .number()
    // .min(0)
    // .max(10000000)
    // .required()
    // .messages({
    //     "number.min": "sub minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
    //     "number.max": "sub maksimal 10000000 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
    //     "any.required": `sub maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    // }),
    foiz:Joi
    .number()
    .min(0)
    .max(100000000)
    .required()
    .messages({
        "number.min": "foiz minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "number.max": "foiz maksimal 10000000 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `sufoizb maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    isFoiz:Joi.boolean()
    .required()
    .messages({
        "boolean": "isFoiz boolean tipida bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
       "any.required": `sufoizb maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    hol:Joi
    .number()
    .min(0)
    .max(2)
    .required()
    .messages({
        "number.min": "hol minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "number.max": "hol maksimal 2 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `hol maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    isFoiz:Joi
    .number()
    .min(0)
    .max(2)
    .required()
    .messages({
        "number.min": "isFoiz minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "number.max": "isFoiz maksimal 2 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `isFoiz maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),

   
});



const category_properties = Joi.object().keys({
    id:Joi
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
    category_id:Joi
    .number()
    .min(0)
    .max(10000000)
    .required()
    .messages({
        "number.min": "category_id minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "number.max": "category_id maksimal 10000000  ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `category_id maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    tip_id:Joi
    .number()
    .min(0)
    .max(10000000)
    .required()
    .messages({
        "number.min": "tip minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "number.max": "tip maksimal 10000000 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `tip maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
   
    hol:Joi
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
    category_properties,
    category
}