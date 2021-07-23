const { number } = require("joi");
const Joi = require("joi")

const product = Joi.object().keys({
    id:Joi.
    number().required()
    .messages({
      
        "number.min": `Id kamida 1 ta bo'lishi kerak!#The id  must be at least 1!#Id  должно быть не менее 1!`,
        "any.required": `Idni kiriting!#Enter the  id!#Введите id !`
    }),
    
    measure: Joi.
    string().required().max(45).min(1)
    .messages({
        "string.base": `O'lchov matn ko'rinishida bo'lishi kerak!#The measure should be in text form!#Measure должна быть в текстовой форме!`,
        "string.max":"Maksimal 45 tadan oshmasin#Not to exceed a maximum of 45#Не более 45",
        "string.min":"Minimal 1 tadan kamaymasin#Not less than 1#Не менее 1",
        "string.empty": `O'lchovni kiriting!#Enter the measure!#Введите measure !`
    }),
    kategorya:Joi.
    number().required().min(1)
    .messages({
      
        "number.min": `Category_id kamida 1 ta bo'lishi kerak!#The Category_id  must be at least 1!#Category_id  должно быть не менее 1!`,
        "any.required": `Category_idni kiriting!#Enter the Category_id!#Введите Category_id !`
    }),
   

    nom:Joi.string().
    required().min(1)
    .messages({
        "min":"Nom kamida 1 ta belgi bo'lishi kerak!#The name must be at least 1 character!#Имя должно состоять минимум из 1 символа!",
        "required": `Nom kirtilmagan!#No name included!#Имя не включен!`
    }),
    izoh:Joi.string().min(1)
    .messages({
        "min":"Izoh kamida 1 ta belgi bo'lishi kerak!#The note must be at least 1 character!#Примечание должно состоять минимум из 1 символа!",
        "required": `Izoh kirtilmagan!#No note included!#Примечание не включен!`
    })
});

const add_product = Joi.object().keys({
    id:Joi.
    number().required()
    .messages({
      
        "number.min": `Id kamida 1 ta bo'lishi kerak!#The id  must be at least 1!#Id  должно быть не менее 1!`,
        "any.required": `Idni kiriting!#Enter the  id!#Введите id !`
    }),
    son:Joi.
    number().required().min(1)
    .messages({
      
        "number.min": `Son kamida 1 ta bo'lishi kerak!#The count  must be at least 1!#Count  должно быть не менее 1!`,
        "any.required": `Sonini kiriting!#Enter the  count!#Введите count !`
    }),

    narx: Joi.
    number().min(1).required()
    .messages({
      
        "number.min": `Narx kamida 1 ta bo'lishi kerak!#Price must be at least 1!#Цена должна быть не меньше 1!`,
        "required": `Narxni kiriting!#Enter the price!#Введите цену!`
    }),

    
    sklad:Joi.
    number().required()
    .messages({
      
        "number.min": `Category_id kamida 1 ta bo'lishi kerak!#The Category_id  must be at least 1!#Category_id  должно быть не менее 1!`,
        "any.required": `Category_idni kiriting!#Enter the Category_id!#Введите Category_id !`
    })
});

const product_ichki = Joi.object().keys({
    id:Joi.
    number().required()
    .messages({
      
        "number.min": `Id kamida 1 ta bo'lishi kerak!#The id  must be at least 1!#Id  должно быть не менее 1!`,
        "any.required": `Idni kiriting!#Enter the  id!#Введите id !`
    }),
    
    
    measure: Joi.
    string().required().max(45).min(1)
    .messages({
        "string.base": `O'lchov matn ko'rinishida bo'lishi kerak!#The measure should be in text form!#Measure должна быть в текстовой форме!`,
        "string.max":"Maksimal 45 tadan oshmasin#Not to exceed a maximum of 45#Не более 45",
        "string.min":"Minimal 1 tadan kamaymasin#Not less than 1#Не менее 1",
        "string.empty": `O'lchovni kiriting!#Enter the measure!#Введите measure !`
    }),
    kategorya:Joi.
    number().required().min(1)
    .messages({
      
        "number.min": `Category_id kamida 1 ta bo'lishi kerak!#The Category_id  must be at least 1!#Category_id  должно быть не менее 1!`,
        "any.required": `Category_idni kiriting!#Enter the Category_id!#Введите Category_id !`
    }),
    isForSale:Joi.number().required().messages({
        "bool.base": `Raqamli bo'lishi kerak!#It must make sense!#Это должно иметь смысл!`,
        "any.required": `isForSaleni kiriting!#Enter the isForSale!#Введите isForSale !`
    }),
    kunlik:Joi.number().required().messages({
        "bool.base": `raqamli bo'lishi kerak!#It must make sense!#Это должно иметь смысл!`,
        "any.required": `Kunlikni kiriting!#Enter the Daily!#Введите Daily !`
    }),

    nom:Joi.string().
    required().min(1)
    .messages({
        "min":"Nom kamida 1 ta belgi bo'lishi kerak!#The name must be at least 1 character!#Имя должно состоять минимум из 1 символа!",
        "required": `Nom kirtilmagan!#No name included!#Имя не включен!`
    }),
    izoh:Joi.string().
    min(1)
    .messages({
        "min":"Izoh kamida 1 ta belgi bo'lishi kerak!#The note must be at least 1 character!#Примечание должно состоять минимум из 1 символа!",
        "required": `Izoh kirtilmagan!#No note included!#Примечание не включен!`
    }),
    masul:Joi.number().required().messages({
        "bool.base": `Masul raqam bo'lishi kerak!#It must make sense!#Это должно иметь смысл!`,
        "any.required": `Masulni kiriting!#Enter the Daily!#Введите Daily !`
    })

});

const  retsep = Joi.object().keys({
    id:Joi.
    number().required()
    .messages({
      
        "number.min": `Mahsulot idsi kamida 1 ta bo'lishi kerak!#The id of products must be at least 1!#Id товаров должно быть не менее 1!`,
        "required": `Mahsulotni idsini kiriting!#Enter the product id!#Введите id продукта!`
    }),
  
    prod:Joi.
    number().required()
    .messages({
      
        "number.min": `Mahsulot idsi kamida 1 ta bo'lishi kerak!#The id of products must be at least 1!#Id товаров должно быть не менее 1!`,
        "required": `Mahsulotni idsini kiriting!#Enter the product id!#Введите id продукта!`
    }),
     root:Joi.
    required()
    .messages({
      
        "array.min": `Mahsulot idsi kamida 1 ta bo'lishi kerak!#The id of products must be at least 1!#Id товаров должно быть не менее 1!`,
        "required": `Mahsulotni idsini kiriting!#Enter the product id!#Введите id продукта!`
    }),
    son:Joi.
    number()
    .messages({
      
        "number.min": `Mahsulot soni kamida 1 ta bo'lishi kerak!#The id of products must be at least 1!#Id товаров должно быть не менее 1!`,
        "required": `Mahsulotni sonini kiriting!#Enter the product count!#Введите count продукта!`
    }),
    baza:Joi.
    number()
    .messages({
      
        "number.min": `Mahsulot soni kamida 1 ta bo'lishi kerak!#The id of products must be at least 1!#Id товаров должно быть не менее 1!`,
        "required": `Mahsulotni sonini kiriting!#Enter the product count!#Введите count продукта!`
    })
})

const  stol = Joi.object().keys({
    id:Joi.
    number().required()
    .messages({
      
        "number.min": `Mahsulot idsi kamida 1 ta bo'lishi kerak!#The id of products must be at least 1!#Id товаров должно быть не менее 1!`,
        "required": `Stol idsini kiriting!#Enter the table id!#Введите id table!`
    }),
  
    nom:Joi.string().
    required().min(1)
    .messages({
        "string.base": `Stol matn ko'rinishida bo'lishi kerak!#The table should be in text form!#Table должна быть в текстовой форме!`,
        "min":"Stol nomi kamida 1 ta belgi bo'lishi kerak!#The table name must be at least 1 character!#Table imya должно состоять минимум из 1 символа!",
        "required": `Stol nomi kirtilmagan!#No table name included!#Table name не включен!`
    }),
})



module.exports = {
    product,product_ichki,
    retsep,stol,add_product
}