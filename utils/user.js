const Joi = require("joi")

const signup = Joi.object().keys({
  
    tel: Joi.string().empty().min(9).max(15).required()
    .messages({
        "string.empty": `Telefon raqam maydoni bo'sh bo'lmasin!#Telefon raqam area should not be empty!#Зона Telefon raqam не должна быть пустой!`,
        "string.min": `Telefon raqam kamida 5 ta belgiga ega bo'lishi kerak!#Telefon raqam must have at least 5 characters!#В Telefon raqam должно быть не менее 5 символов!`,
        "string.max": `Telefon raqam ko'pi  bilan 50 ta belgidan oshmasin!#Telefon raqam should not exceed 50 characters at most!#Telefon raqam не должен превышать 50 символов!`,
        "any.required": `Telefon raqam maydoni kerak!#Telefon raqam field required!#Поле для полного Telefon raqam обязательно!`
    }),
  
    parol: Joi.string().
    min(4).
    max(100).
    required()
    .messages({
        "string.min": "Parol minimal 4 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Parol maksimal 100 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `Parol maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    })
   
});


const signupdate = Joi.object().keys({
  
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
    address: Joi.string().empty().max(255).required()
    .messages({
        "string.empty": `Address raqam maydoni bo'sh bo'lmasin!#Address raqam area should not be empty!#Зона Address raqam не должна быть пустой!`,
         "string.max": `Address raqam ko'pi  bilan 255 ta belgidan oshmasin!#Address raqam should not exceed 50 characters at most!#Address raqam не должен превышать 50 символов!`,
        "any.required": `Address raqam maydoni kerak!#Address raqam field required!#Поле для полного Telefon raqam обязательно!`
    })   
});

const change_user = Joi.object().keys({
    id:Joi.number().required()
    .messages({
        "number.base": `Id sonli tipda bo'lishi kerak!#The phone should look like 998XXXXXXXXX!#Телефон должен выглядеть как 998XXXXXXXXX!`,
        "any.required":"Id maydoni kiritilishi majburiy!#Phone field is required!#Поле телефона обязательно!"
    }),
    tel: Joi.string().max(15).min(7).required()
    .messages({
        "string.base": `Telefon matnli tipda bo'lishi kerak!#The phone should look like 998XXXXXXXXX!#Телефон должен выглядеть как 998XXXXXXXXX!`,
        "string.max": `Telefon ko'pi bilan 15 ta belgidan iborat bo'lishi kerak!#The phone should look like 998XXXXXXXXX!#Телефон должен выглядеть как 998XXXXXXXXX!`,
        "string.min": `Telefon kamida 7 ta raqam bo'lishi kerak!#The phone should look like 998XXXXXXXXX!#Телефон должен выглядеть как 998XXXXXXXXX!`,
        "any.required":"Telefon maydoni kiritilishi majburiy!#Phone field is required!#Поле телефона обязательно!"
    }),
    ism: Joi.
    string().empty().min(2).max(100).required()
    .messages({
        "string.empty": `Ism maydoni bo'sh bo'lmasin!#First name area should not be empty!#Зона имени не должна быть пустой!`,
        "string.min": `Ism kamida 5 ta belgiga ega bo'lishi kerak!#First name must have at least 5 characters!#В имени должно быть не менее 5 символов!`,
        "string.max": `Ism ko'pi  bilan 100 ta belgidan oshmasin!#First name should not exceed 100 characters at most!#имени не должен превышать 100 символов!`,
        "any.required": `Ism maydoni kerak!#First name field required!#Поле для полного имени обязательно!`
    }),
    fam: Joi.
    string().empty().min(2).max(100).required()
    .messages({
        "string.empty": `Familiya maydoni bo'sh bo'lmasin!#Last name area should not be empty!#Зона имени не должна быть пустой!`,
        "string.min": `Familiya kamida 5 ta belgiga ega bo'lishi kerak!#Last name must have at least 5 characters!#В имени должно быть не менее 5 символов!`,
        "string.max": `Familiya ko'pi  bilan 100 ta belgidan oshmasin!#Last name should not exceed 100 characters at most!#имени не должен превышать 100 символов!`,
        "any.required": `Familiya maydoni kerak!#Last name field required!#Поле для полного имени обязательно!`
    }),
    address: Joi.string().empty().max(255).required()
    .messages({
        "string.empty": `Address raqam maydoni bo'sh bo'lmasin!#Address raqam area should not be empty!#Зона Address raqam не должна быть пустой!`,
         "string.max": `Address raqam ko'pi  bilan 255 ta belgidan oshmasin!#Address raqam should not exceed 50 characters at most!#Address raqam не должен превышать 50 символов!`,
        "any.required": `Address raqam maydoni kerak!#Address raqam field required!#Поле для полного Telefon raqam обязательно!`
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

const blocked = Joi.object().keys({
    id:Joi.
    number().required()
    .messages({      
        "any.required": `Idni kiriting!#Enter the  id!#Введите id !`
    }),
    holat:Joi.
    number().required()
    .messages({      
        "any.required": `Holatni kiriting!#Enter the status!#Введите status !`
    })
});


const editPassword = Joi.object().keys({
    oldPass: Joi.string().
    min(4).
    max(100).
    required()
    .messages({
        "string.min": "Eski Parol minimal 4 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Eski Parol maksimal 100 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `Eski Parol maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    newPass: Joi.string().
    min(4).
    max(100).
    required()
    .messages({
        "string.min": "Yangi Parol minimal 4 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Yangi Parol maksimal 100 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `Yangi Parol maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    })
});

const  roledit = Joi.object().keys({
    id: Joi.number().
    min(0).
    max(1000000).
    required()
    .messages({
        "number.min": "Id minimal 1 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "number.max": "Id maksimal 1000000 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `Id maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    rol: Joi.number().
    min(0).
    max(10000000).
    required()
    .messages({
        "number.min": "rol minimal 1 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "number.max": "rol maksimal 10000000 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `rol maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    }),
    holat: Joi.number().
    min(0).
    max(1).
    required()
    .messages({
        "number.min": "Holat minimal 0 bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "number.max": "Holat maksimal 1 bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        "any.required": `Holat maydoni kiritilishi majburiy!#Password field required!#Поле пароля обязательно!`
    })
}); 

module.exports = {
    signin,
   signup,
   blocked,
   signupdate,
   editPassword,
   roledit,
   change_user
}