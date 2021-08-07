const Joi = require("joi")

const promokod = Joi.object().keys({
 
    token: Joi.string().
    min(1).
    max(255)
    .messages({
        "string.min": "Nom minimal 1 ta belgidan iborat bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "string.max": "Nom maksimal 100 ta belgi iborat bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
      }),
      isFoiz:Joi
      .number()
      .min(0)
      .max(1)
      .messages({
          "number.min": "isFoiz minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
          "number.max": "isFoiz maksimal 1 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
       }),
       
       amount:Joi
       .number()
       .min(0)
       .max(100000000)
       .messages({
           "number.min": "amount minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
           "number.max": "amount maksimal 100000000 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
        }),
        user_id:Joi
    .number()
    .min(0)
    .max(100000000)
    .messages({
        "number.min": "user_id minimal 0 ga teng bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
        "number.max": "user_id maksimal 100000000 ga teng bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
     }),
     deadline:Joi
     .date()
     .min(new Date())
     .messages({
         "date.base": "deadline vaqt tipida bo'lishi kerak !#The password must be at least 4 characters long!#Пароль должен состоять не менее чем из 4 символов!",
         "date.min": "deadline Hozirgi vaqtdan katta bo'lishi kerak bo'lishi kerak !#The password must be a maximum of 100 characters!#Пароль должен состоять максимум из 100 символов!",
      }),
   
});



module.exports = {
    
    promokod
}