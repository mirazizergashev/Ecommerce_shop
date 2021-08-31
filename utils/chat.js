const Joi = require("joi")

const chatAll = Joi.object().keys({
   

    user_id:Joi
    .number()
    
    .messages({
        "number": "Butun son kirit !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!"
        })
    ,
    text: Joi.string().
    min(1).
    max(8192)    
    .messages({
        "string.min": "Text minimal 1 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Text maksimal 8192 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `Text maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
   
    
   
});

const chatStop = Joi.object().keys({
   

    user_id:Joi
    .number()
    
    .messages({
        "number": "Butun son kirit !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!"
        })
   
   
});

const chatAdmin = Joi.object().keys({
   

    text: Joi.string().
    min(1).
    max(8192)    
    .messages({
        "string.min": "Text minimal 1 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Text maksimal 8192 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `Text maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
   
    
   
});



module.exports = {
    chatAll,chatAdmin,chatStop
}