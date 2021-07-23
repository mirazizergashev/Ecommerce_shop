const Joi = require("joi")
const roles_pages = Joi.object().keys({
    id: Joi.
    number()
    .messages({
        "number.base": `Id raqam ko'rinishida bo'lishi kerak!#Id should be in number form!#Id должен быть в числовой форме!`
    }),
    role_id: Joi.
    number()
    .messages({
        "number.base": `Rol_Id raqam ko'rinishida bo'lishi kerak!#Rol_Id should be in number form!#Rol_Id должен быть в числовой форме!`
    }),
    page_id: Joi.
    number()
    .messages({
        "number.base": `Sahifa_Id raqam ko'rinishida bo'lishi kerak!#cTpaNuTca_Id should be in number form!#Page_Id должен быть в числовой форме!`
    
    }),
    active: Joi
    .number()
    .min(0)
    .max(1)
    .messages({
        "number.base": `Raqam ko'rinishida 1 yoki 0 yuborilishi kerak#The number view must be 1 or 0#Номер просмотра должен быть 1 или 0`,
        "number.min": `Eng kamida 0 kiritilishi mumkin#At least 0 can be entered#Можно ввести как минимум 0`,
        "number.max": `1 dan katta son kiritish mumkin emas#Numbers greater than 1 cannot be entered#Числа больше 1 вводить нельзя.`,
    })
});
//

const users_roles = Joi.object().keys({
    id: Joi.
    number()
    .messages({
        "number.base": `Id raqam ko'rinishida bo'lishi kerak!#Id should be in number form!#Id должен быть в числовой форме!`
    }),
    role_id: Joi.
    number()
    .messages({
        "number.base": `Rol_Id raqam ko'rinishida bo'lishi kerak!#Rol_Id should be in number form!#Rol_Id должен быть в числовой форме!`
    }),
    user_id: Joi.
    number()
    .messages({
        "number.base": `User_Id raqam ko'rinishida bo'lishi kerak!#User_Id should be in number form!#userw_Id должен быть в числовой форме!`
    
    }),
    
    active: Joi
    .number()
    .min(0)
    .max(1)
    .messages({
        "number.base": `Raqam ko'rinishida 1 yoki 0 yuborilishi kerak#The number view must be 1 or 0#Номер просмотра должен быть 1 или 0`,
        "number.min": `Eng kamida 0 kiritilishi mumkin#At least 0 can be entered#Можно ввести как минимум 0`,
        "number.max": `1 dan katta son kiritish mumkin emas#Numbers greater than 1 cannot be entered#Числа больше 1 вводить нельзя.`,
    })
});
const human = Joi.object().keys({
   
    user_id: Joi.
    number()
    .messages({
        "number.base": `User_Id raqam ko'rinishida bo'lishi kerak!#User_Id should be in number form!#userw_Id должен быть в числовой форме!`
    
    })
});

module.exports={
    roles_pages,users_roles,human
}