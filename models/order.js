
const Joi = require("joi")

const buy_product=Joi.object().keys({
    product_id: Joi.number().empty().min(1).max(1000000).required()
    .messages({
        "number.empty": `product_id kiritilishi majburiy!#It is mandatory to enter a table number!#Обязательно вводить номер таблицы!`,
        "number.min": `product_id 1 dan katta bo'lishi kerak!#Table ID must be greater than 1!#Идентификатор рабочего стола должен быть больше 1!`,
        "number.max": `product_id 1000000 dan kichik bo'lishi kerak!#Table ID must be less than 1,000,000!#Идентификатор рабочего стола должен быть меньше 1 000 000!`,
        "any.required": `product_id ni kiritish majburiy#It is mandatory to enter the table ID!#Обязательно вводить идентификатор рабочего стола`
    }),
    count: Joi.number().empty().min(1).max(1000000).required()
    .messages({
        "number.empty": `Maxsulotlar soni kiritilishi majburiy!#It is mandatory to enter a table number!#Обязательно вводить номер таблицы!`,
        "number.min": `Maxsulotlar soni 1 dan katta bo'lishi kerak!#Table ID must be greater than 1!#Идентификатор рабочего стола должен быть больше 1!`,
        "number.max": `Maxsulotlar soni 1000000 dan kichik bo'lishi kerak!#Table ID must be less than 1,000,000!#Идентификатор рабочего стола должен быть меньше 1 000 000!`,
        "any.required": `Maxsulotlar soni ni kiritish majburiy#It is mandatory to enter the table ID!#Обязательно вводить идентификатор рабочего стола`
    }), 
    cost: Joi.number().empty().min(1000).max(1000000000).required()
    .messages({
        "number.empty": `Maxsulotlar narxi kiritilishi majburiy!#It is mandatory to enter a table number!#Обязательно вводить номер таблицы!`,
        "number.min": `Maxsulotlar narxi 1000 dan katta bo'lishi kerak!#Table ID must be greater than 1!#Идентификатор рабочего стола должен быть больше 1!`,
        "number.max": `Maxsulotlar narxi 1000000000 dan kichik bo'lishi kerak!#Table ID must be less than 1,000,000!#Идентификатор рабочего стола должен быть меньше 1 000 000!`,
        "any.required": `Maxsulotlar narxi ni kiritish majburiy#It is mandatory to enter the table ID!#Обязательно вводить идентификатор рабочего стола`
    })
})

const mainorder = Joi.object().keys({
    table_id: Joi.number().empty().min(1).max(1000000).required()
    .messages({
        "number.empty": `Stol raqami kiritilishi majburiy!#It is mandatory to enter a table number!#Обязательно вводить номер таблицы!`,
        "number.min": `Stol ID si 1 dan katta bo'lishi kerak!#Table ID must be greater than 1!#Идентификатор рабочего стола должен быть больше 1!`,
        "number.max": `Stol IDsi 1000000 dan kichik bo'lishi kerak!#Table ID must be less than 1,000,000!#Идентификатор рабочего стола должен быть меньше 1 000 000!`,
        "any.required": `Stol IDsi ni kiritish majburiy#It is mandatory to enter the table ID!#Обязательно вводить идентификатор рабочего стола`
    }),
    // ofitsiant_id: Joi.number().empty().min(1).max(1000000).required()
    // .messages({
    //     "number.empty": `Ofitsiant raqami kiritilishi majburiy!#Waiter number is required!#Необходимо ввести номер официанта!`,
    //     "number.min": `Ofitsiant ID si 1 dan katta bo'lishi kerak!#Waiter ID must be greater than 1!#ID официанта должен быть больше 1!`,
    //     "number.max": `Ofitsiant IDsi 1000000 dan kichik bo'lishi kerak!#Waiter ID must be less than 1,000,000!#Идентификатор официанта должен быть меньше 1000000!`,
    //     "any.required": `Ofitsiant IDsi ni kiritish majburiy#It is mandatory to enter the waiter ID!#Обязательно вводить ID официанта.`
    // }),
    // cost:Joi.number().min(0).max(1000000000).required()
    // .messages({
    //     "number.min": `Umumiy summa kamida 0 bo'lishi kerak!#Waiter ID must be greater than 1!#ID официанта должен быть больше 1!`,
    //     "number.max": `Ofitsiant IDsi 1000000 dan kichik bo'lishi kerak!#Waiter ID must be less than 1,000,000!#Идентификатор официанта должен быть меньше 1000000!`,
    //     "number.required": `Ofitsiant IDsi ni kiritish majburiy#It is mandatory to enter the waiter ID!#Обязательно вводить ID официанта.`
    // })
});

const order = Joi.object().keys({
    product_id: Joi.number().empty().min(1).max(1000000).required()
    .messages({
        "number.empty": `Stol raqami kiritilishi majburiy!#It is mandatory to enter a table number!#Обязательно вводить номер таблицы!`,
        "number.min": `Stol ID si 1 dan katta bo'lishi kerak!#Table ID must be greater than 1!#Идентификатор рабочего стола должен быть больше 1!`,
        "number.max": `Stol IDsi 1000000 dan kichik bo'lishi kerak!#Table ID must be less than 1,000,000!#Идентификатор рабочего стола должен быть меньше 1 000 000!`,
        "any.required": `Stol IDsi ni kiritish majburiy#It is mandatory to enter the table ID!#Обязательно вводить идентификатор рабочего стола`
    }),
    count: Joi.number().empty().min(1).max(1000).required()
    .messages({
        "number.empty": `Maxsulot soni kiritilishi majburiy!#It is mandatory to enter a table number!#Обязательно вводить номер таблицы!`,
        "number.min": `Maxsulot soni  1 dan katta bo'lishi kerak!#Table ID must be greater than 1!#Идентификатор рабочего стола должен быть больше 1!`,
        "number.max": `Maxsulot soni 1000000 dan kichik bo'lishi kerak!#Table ID must be less than 1,000,000!#Идентификатор рабочего стола должен быть меньше 1 000 000!`,
        "any.required": `Maxsulot sonini kiritish majburiy#It is mandatory to enter the table ID!#Обязательно вводить идентификатор рабочего стола`
    }),
    main_order_id: Joi.number().empty().min(1).max(1000000).required()
    .messages({
        "number.empty": `Buyurtma raqami kiritilishi majburiy!#It is mandatory to enter a table number!#Обязательно вводить номер таблицы!`,
        "number.min": `Buyurtma ID si 1 dan katta bo'lishi kerak!#Table ID must be greater than 1!#Идентификатор рабочего стола должен быть больше 1!`,
        "number.max": `Buyurtma IDsi 1000000 dan kichik bo'lishi kerak!#Table ID must be less than 1,000,000!#Идентификатор рабочего стола должен быть меньше 1 000 000!`,
        "any.required": `Buyurtma IDsi ni kiritish majburiy#It is mandatory to enter the table ID!#Обязательно вводить идентификатор рабочего стола`
    }),
    isSklad: Joi.number().empty().min(0).max(1).required()
    .messages({
        "number.empty": `isSklad tanlanishi majburiy!#It is mandatory to enter a table number!#Обязательно вводить номер таблицы!`,
        "number.min": `isSklad  0 yoki 1 bo'lishi kerak!#Table ID must be greater than 1!#Идентификатор рабочего стола должен быть больше 1!`,
        "number.max": `isSklad  0 yoki 1 bo'lishi kerak!#Table ID must be less than 1,000,000!#Идентификатор рабочего стола должен быть меньше 1 000 000!`,
        "any.required": `isSkladni tanlash  majburiy#It is mandatory to enter the table ID!#Обязательно вводить идентификатор рабочего стола`
    })
});

let share_product=Joi.object().keys({
    product_id: Joi.number().empty().min(1).max(1000000).required()
    .messages({
        "number.empty": `product_id kiritilishi majburiy!#It is mandatory to enter a table number!#Обязательно вводить номер таблицы!`,
        "number.min": `product_id 1 dan katta bo'lishi kerak!#Table ID must be greater than 1!#Идентификатор рабочего стола должен быть больше 1!`,
        "number.max": `product_id 1000000 dan kichik bo'lishi kerak!#Table ID must be less than 1,000,000!#Идентификатор рабочего стола должен быть меньше 1 000 000!`,
        "any.required": `product_id ni kiritish majburiy#It is mandatory to enter the table ID!#Обязательно вводить идентификатор рабочего стола`
    }),
    count: Joi.number().empty().min(1).max(1000000).required()
    .messages({
        "number.empty": `Maxsulotlar soni kiritilishi majburiy!#It is mandatory to enter a table number!#Обязательно вводить номер таблицы!`,
        "number.min": `Maxsulotlar soni 1 dan katta bo'lishi kerak!#Table ID must be greater than 1!#Идентификатор рабочего стола должен быть больше 1!`,
        "number.max": `Maxsulotlar soni 1000000 dan kichik bo'lishi kerak!#Table ID must be less than 1,000,000!#Идентификатор рабочего стола должен быть меньше 1 000 000!`,
        "any.required": `Maxsulotlar soni ni kiritish majburiy#It is mandatory to enter the table ID!#Обязательно вводить идентификатор рабочего стола`
    }),
    to_id: Joi.number().empty().min(1).max(1000000).required()
    .messages({
        "number.empty": `Qabul qiluvchi IDsi kiritilishi majburiy!#It is mandatory to enter a table number!#Обязательно вводить номер таблицы!`,
        "number.min": `Qabul qiluvchi IDsi 1 dan katta bo'lishi kerak!#Table ID must be greater than 1!#Идентификатор рабочего стола должен быть больше 1!`,
        "number.max": `Qabul qiluvchi IDsi 1000000 dan kichik bo'lishi kerak!#Table ID must be less than 1,000,000!#Идентификатор рабочего стола должен быть меньше 1 000 000!`,
        "any.required": `Qabul qiluvchi IDsi ni kiritish majburiy#It is mandatory to enter the table ID!#Обязательно вводить идентификатор рабочего стола`
    }),
    to_depart: Joi.number().empty().min(1).max(1000000).required()
    .messages({
        "number.empty": `Depart IDsi kiritilishi majburiy!#It is mandatory to enter a table number!#Обязательно вводить номер таблицы!`,
        "number.min": `Depart IDsi 1 dan katta bo'lishi kerak!#Table ID must be greater than 1!#Идентификатор рабочего стола должен быть больше 1!`,
        "number.max": `Depart IDsi 1000000 dan kichik bo'lishi kerak!#Table ID must be less than 1,000,000!#Идентификатор рабочего стола должен быть меньше 1 000 000!`,
        "any.required": `Depart IDsi ni kiritish majburiy#It is mandatory to enter the table ID!#Обязательно вводить идентификатор рабочего стола`
    }),
    isSklad: Joi.number().min(0).max(1)
    .messages({
        "number.min": `isSklad 0 dan katta bo'lishi kerak!#Table ID must be greater than 1!#Идентификатор рабочего стола должен быть больше 1!`,
        "number.max": `isSklad 1 dan kichik bo'lishi kerak!#Table ID must be less than 1,000,000!#Идентификатор рабочего стола должен быть меньше 1 000 000!`,
        }),
})

module.exports = {
    order,mainorder,share_product,buy_product
}