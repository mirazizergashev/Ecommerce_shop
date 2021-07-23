const Joi = require("joi")

const signup = Joi.object().keys({
    fio: Joi.
    string().empty().min(5).max(100).required()
    .messages({
        "string.empty": `To'liq ism sharif maydoni bo'sh bo'lmasin!#Full Name area should not be empty!#Зона имени не должна быть пустой!`,
        "string.min": `To'liq ism sharif kamida 5 ta belgiga ega bo'lishi kerak!#Full Name must have at least 5 characters!#В имени должно быть не менее 5 символов!`,
        "string.max": `To'liq ism sharif ko'pi  bilan 100 ta belgidan oshmasin!#Full Name should not exceed 100 characters at most!#имени не должен превышать 100 символов!`,
        "required": `To'liq ism sharif maydoni kerak!#Full Name field required!#Поле для полного имени обязательно!`
    }),
    login: Joi.string().empty().min(5).max(50).required()
    .messages({
        "string.empty": `Login maydoni bo'sh bo'lmasin!#Login area should not be empty!#Зона login не должна быть пустой!`,
        "string.min": `Login kamida 5 ta belgiga ega bo'lishi kerak!#Login must have at least 5 characters!#В login должно быть не менее 5 символов!`,
        "string.max": `Login ko'pi  bilan 50 ta belgidan oshmasin!#Login should not exceed 50 characters at most!#login не должен превышать 50 символов!`,
        "required": `Login maydoni kerak!#Login field required!#Поле для полного login обязательно!`
    }),
  
    password: Joi.string().
    min(4).
    max(100).
    required()
    .messages({
        "string.min": "Parol minimal 4 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Parol maksimal 100 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "required": `Parol maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    })
});

const  signin = Joi.object().keys({
    login: Joi.string().max(50).min(5).required()
    .messages({
        "string.base": `Login matnli tipda bo'lishi kerak!#The phone should look like 998XXXXXXXXX!#Телефон должен выглядеть как 998XXXXXXXXX!`,
        "string.max": `Login ko'pi bilan 50 ta belgidan iborat bo'lishi kerak!#The phone should look like 998XXXXXXXXX!#Телефон должен выглядеть как 998XXXXXXXXX!`,
        "string.min": `Login kamida 5 ta raqam bo'lishi kerak!#The phone should look like 998XXXXXXXXX!#Телефон должен выглядеть как 998XXXXXXXXX!`,
        "any.required":"Login maydoni kiritilishi majburiy!#Phone field is required!#Поле телефона обязательно!"
    }),
  
    password: Joi.string().min(4).
    max(100).
    required()
    .messages({
        "string.min": "Parol minimal 4 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Parol maksimal 100 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "required": `Parol maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
})




module.exports = {
    signin,
   signup
}