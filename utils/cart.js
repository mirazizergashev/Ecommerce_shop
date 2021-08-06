const Joi = require("joi")

const cart_create = Joi.object().keys({
    
    // user_id:Joi
    // .number()
    // .required()
    // .messages({
    //     "number": "user_id butun son bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!"
    //     ,"any.required": `user_id maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    // }),
    product_id:Joi
    .number()
    .required()
    .messages({
        "number": "product_id butun son bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!"
        ,"any.required": `product_id maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    count: Joi
        .number()
        .min(1)
        .max(100000000)
        .required()
        .messages({
            "number.min": "count minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
            "number.max": "count maksimal 10000000 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
            "any.required": `count maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
        }),
       
});


const cart_update = Joi.object().keys({
  
    id:Joi
    .number()
    .required()
    .messages({
        "number": "id butun son bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!"
        ,"any.required": `id maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
  
status:Joi
.number()
.min(0)
.max(20)
.required()
.messages({
    "number.min": "Status minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
    "number.max": "Status maksimal 20 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
    "any.required": `Status maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
}),


});


const delivered_create = Joi.object().keys({
  
    cart_id:Joi
    .number()
    .required()
    .messages({
        "number": "cart_id butun son bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!"
        ,"any.required": `cart_id maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    comments: Joi.string().
min(1).
max(4096).
required()
.messages({
    "string.min": "comments minimal 1 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
    "string.max": "comments maksimal 4096 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
    "any.required": `comments maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
}),
mark:Joi
.number()
.min(0)
.max(100)
.required()
.messages({
    "number": "mark butun son bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
    "number.min": "mark minimal 0 bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
    "number.max": "mark maksimal 100 bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
    "any.required": `mark maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`,
}),



});


const delivered_update = Joi.object().keys({
  
    id:Joi
    .number()
    .required()
    .messages({
        "number": "id butun son bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!"
        ,"any.required": `id maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
  
status:Joi
.number()
.min(0)
.max(1)
.required()
.messages({
    "number.min": "Status minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
    "number.max": "Status maksimal 1 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
    "any.required": `Status maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
}),


});
module.exports = {
    cart_create,
    cart_update,
    delivered_create,
    delivered_update
}