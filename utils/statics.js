const Joi = require("joi")

const stat = Joi.object().keys({
    id:Joi.
    number().required()
    .messages({
      
        "number.min": `Id kamida 1 ta bo'lishi kerak!#The id  must be at least 1!#Id  должно быть не менее 1!`,
        "any.required": `Idni kiriting!#Enter the  id!#Введите id !`
    }),
    nom: Joi.
    string().empty().min(2).max(100).required()
    .messages({
        "string.empty": `Nom maydoni bo'sh bo'lmasin!#First name area should not be empty!#Зона имени не должна быть пустой!`,
        "string.min": `Nom kamida 5 ta belgiga ega bo'lishi kerak!#First name must have at least 5 characters!#В имени должно быть не менее 5 символов!`,
        "string.max": `Nom ko'pi  bilan 100 ta belgidan oshmasin!#First name should not exceed 100 characters at most!#имени не должен превышать 100 символов!`,
        "required": `Nom maydoni kerak!#First name field required!#Поле для полного имени обязательно!`
    }),
    holat:Joi.
    number().required()
    .messages({
      
        "number.min": `Holat kamida 1 ta bo'lishi kerak!#The id  must be at least 1!#Id  должно быть не менее 1!`,
        "any.required": `Holatni kiriting!#Enter the  id!#Введите id !`
    })
});





module.exports = {
    stat
}