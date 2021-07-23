const Joi = require("joi")

const role = Joi.object().keys({
    id:Joi.
    number().required()
    .messages({
      
        "number.min": `Id kamida 1 ta bo'lishi kerak!#The id  must be at least 1!#Id  должно быть не менее 1!`,
        "any.required": `Idni kiriting!#Enter the  id!#Введите id !`
    }),
    name: Joi.
    string().required().max(200).min(1)
    .messages({
        "string.base": `Rol matn ko'rinishida bo'lishi kerak!#The role should be in text form!#Роль должна быть в текстовой форме!`,
        "string.max":"Maksimal 200 tadan oshmasin#Not to exceed a maximum of 200#Не более 200",
        "string.min":"Minimal 1 tadan kamaymasin#Not less than 1#Не менее 1",
        "string.empty": `Rolni kiriting!#Enter the role!#Введите poл !`
    }),

    hol: Joi.
    number()
    .messages({
        "number.base": `Status raqam ko'rinishida bo'lishi kerak!#Status should be in number form!#Статус должен быть в числовой форме!`,
    }),
    url: Joi.
    string().required().max(200).min(1)
    .messages({
        "string.base": `Url matn ko'rinishida bo'lishi kerak!#The url should be in text form!#Url должна быть в текстовой форме!`,
        "string.max":"Maksimal 200 tadan oshmasin#Not to exceed a maximum of 200#Не более 200",
        "string.min":"Minimal 1 tadan kamaymasin#Not less than 1#Не менее 1",
        "any.required": `Urlni kiriting!#Enter the url!#Введите url !`
    }),
    bolim: Joi.
    number().min(1)
    .messages({
        "number.base": `Bolim raqam ko'rinishida bo'lishi kerak!#Status should be in number form!#Статус должен быть в числовой форме!`,
    
        "number.min": `Id kamida 1 ta bo'lishi kerak!#The id  must be at least 1!#Id  должно быть не менее 1!`,
    }),
    
});

const depart = Joi.object().keys({
    id:Joi.
    number().required()
    .messages({
      
        "number.min": `Id kamida 1 ta bo'lishi kerak!#The id  must be at least 1!#Id  должно быть не менее 1!`,
        "any.required": `Idni kiriting!#Enter the  id!#Введите id !`
    }),
    name: Joi.
    string().required().max(200).min(1)
    .messages({
        "string.base": `Bolim matn ko'rinishida bo'lishi kerak!#The role should be in text form!#Роль должна быть в текстовой форме!`,
        "string.max":"Maksimal 200 tadan oshmasin#Not to exceed a maximum of 200#Не более 200",
        "string.min":"Minimal 1 tadan kamaymasin#Not less than 1#Не менее 1",
        "string.empty": `Bolimni kiriting!#Enter the role!#Введите poл !`
    })
});

const page = Joi.object().keys({
    name: Joi.
    string().required().max(500).min(1)
    .messages({
        "string.base": `page_name  matn ko'rinishida bo'lishi kerak!#page_name must be in text form!#имя_страницы должно быть в текстовой форме!`,
        "string.empty": `page_name ni kiriting!#Enter page_name!#Введите имя_страницы!`,
        "string.max":"Maximal 500 ta belgi kiriting#Enter a maximum of 500 characters#Введите не более 500 символов.",
        "string.min":"Kamida 1 ta belgi kiriting#Enter at least 1 character#Введите хотя бы 1 символ"
    }),
    icon: Joi.
    string().required().max(200).min(1)
    .messages({
        "string.base": `Icon  matn ko'rinishida bo'lishi kerak!#The icon should be in text view!#Значок должен быть в текстовом виде!`,
        "string.empty": `Icon ni kiriting!#Enter the icon!#Введите значок!`,
        "string.max":"Maximal 200 ta belgi kiriting#Enter a maximum of 200 characters#Введите не более 200 символов.",
        "string.min":"Kamida 1 ta belgi kiriting#Enter at least 1 character#Введите хотя бы 1 символ"
    }),

    url: Joi.
    string().required()
    .messages({
        "string.base": `P_url yo'li  matn ko'rinishida bo'lishi kerak!#The P_url path must be in text view!#Путь P_url должен быть в текстовом представлении!`,
        "string.empty": `P_url ni yo'lini kiriting!#Enter the path of P_url!#Введите путь к P_url!`
    }),
   
    id:Joi.
    number().required()
    .messages({
      
        "number.min": `Id kamida 1 ta bo'lishi kerak!#The id  must be at least 1!#Id  должно быть не менее 1!`,
        "any.required": `Idni kiriting!#Enter the  id!#Введите id !`
    }),
    hol: Joi.
    number()
    .messages({
        "number.base": `Status raqam ko'rinishida bo'lishi kerak!#Status should be in number form!#Статус должен быть в числовой форме!`,
    })
});




module.exports = {
    role: role,
    depart: depart,
    page:page
}