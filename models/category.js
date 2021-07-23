const Joi = require("joi")

const category = Joi.object().keys({
    name: Joi.
    string().empty().min(3).max(100).required()
    .messages({
        "string.empty": `Kategoriya nomi maydoni bo'sh bo'lmasin!#Full Name area should not be empty!#Зона имени не должна быть пустой!`,
        "string.min": `Kategoriya nomi kamida 5 ta belgiga ega bo'lishi kerak!#Full Name must have at least 5 characters!#В имени должно быть не менее 5 символов!`,
        "string.max": `Kategoriya nomi ko'pi  bilan 100 ta belgidan oshmasin!#Full Name should not exceed 100 characters at most!#имени не должен превышать 100 символов!`,
        "required": `Kategoriya nomi maydoni kerak!#Full Name field required!#Поле для полного имени обязательно!`
    })
});



module.exports = {
    category
}