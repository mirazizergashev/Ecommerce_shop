const Joi = require("joi")

const signup = Joi.object().keys({
    ism: Joi.
    string().empty().min(2).max(100).required()
    .messages({
        "string.empty": `Ism maydoni bo'sh bo'lmasin!#First name area should not be empty!#Зона имени не должна быть пустой!`,
        "string.min": `Ism kamida 5 ta belgiga ega bo'lishi kerak!#First name must have at least 5 characters!#В имени должно быть не менее 5 символов!`,
        "string.max": `Ism ko'pi  bilan 100 ta belgidan oshmasin!#First name should not exceed 100 characters at most!#имени не должен превышать 100 символов!`,
        "required": `Ism maydoni kerak!#First name field required!#Поле для полного имени обязательно!`
    }),
    fam: Joi.
    string().empty().min(2).max(100).required()
    .messages({
        "string.empty": `Familiya maydoni bo'sh bo'lmasin!#Last name area should not be empty!#Зона имени не должна быть пустой!`,
        "string.min": `Familiya kamida 5 ta belgiga ega bo'lishi kerak!#Last name must have at least 5 characters!#В имени должно быть не менее 5 символов!`,
        "string.max": `Familiya ko'pi  bilan 100 ta belgidan oshmasin!#Last name should not exceed 100 characters at most!#имени не должен превышать 100 символов!`,
        "required": `Familiya maydoni kerak!#Last name field required!#Поле для полного имени обязательно!`
    }),
    tel: Joi.string().empty().min(9).max(15).required()
    .messages({
        "string.empty": `Login maydoni bo'sh bo'lmasin!#Login area should not be empty!#Зона login не должна быть пустой!`,
        "string.min": `Login kamida 5 ta belgiga ega bo'lishi kerak!#Login must have at least 5 characters!#В login должно быть не менее 5 символов!`,
        "string.max": `Login ko'pi  bilan 50 ta belgidan oshmasin!#Login should not exceed 50 characters at most!#login не должен превышать 50 символов!`,
        "required": `Login maydoni kerak!#Login field required!#Поле для полного login обязательно!`
    }),
  
    parol: Joi.string().
    min(4).
    max(100).
    required()
    .messages({
        "string.min": "Parol minimal 4 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Parol maksimal 100 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "required": `Parol maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    rol:Joi.
    number().required()
    .messages({
      
        "number.min": `rol_id kamida 1 ta bo'lishi kerak!#The id  must be at least 1!#Id  должно быть не менее 1!`,
        "any.required": `Idni kiriting!#Enter the  id!#Введите id !`
    })
});

const  signin = Joi.object().keys({
    tel: Joi.string().max(15).min(7).required()
    .messages({
        "string.base": `Telefon matnli tipda bo'lishi kerak!#The phone should look like 998XXXXXXXXX!#Телефон должен выглядеть как 998XXXXXXXXX!`,
        "string.max": `Telefon ko'pi bilan 15 ta belgidan iborat bo'lishi kerak!#The phone should look like 998XXXXXXXXX!#Телефон должен выглядеть как 998XXXXXXXXX!`,
        "string.min": `Telefon kamida 7 ta raqam bo'lishi kerak!#The phone should look like 998XXXXXXXXX!#Телефон должен выглядеть как 998XXXXXXXXX!`,
        "any.required":"Telefon maydoni kiritilishi majburiy!#Phone field is required!#Поле телефона обязательно!"
    }),
  
    parol: Joi.string().min(4).
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