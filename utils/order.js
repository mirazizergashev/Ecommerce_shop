const Joi = require("joi")

const order_status = Joi.object().keys({
    order_id:Joi
    .number()
    .required()
    .messages({
        "string": "Butun son kirit !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!"
        }),

    status:Joi
    .number()
    .min(0)
    .max(100)
    .required()
    .messages({
        "string.min": "Status minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Status maksimal 1 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `Status maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),

   
});




module.exports = {
    
    order_status
}