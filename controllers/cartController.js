var cartModel = require('../models/cartModel');
const schema = require('../utils/cart')

var cartController = {}


cartController.create = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.cart_create.validate(req.body);
    if (checked.error) {
        const msg = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: msg[0],
                    en: msg[1],
                    ru: msg[2]
                }
            }

        });
    }
    let a = req.body;
    var data = [0,
        a.user_id || 0,
        a.product_id || 0,
        a.count,
        null
    ]

    cartModel.cart_edit_insert(data, function (err, result) {
        if (err) {
            console.log(err)
            return res.status(200).json({
                code: 500,
                error: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        en: "Rejected due to server error!",
                        ru: "Отклонено из-за ошибки сервера!"
                    }
                }
            })
        } else {
            // req.flash('success', 'Employee added succesfully');
            switch (result[0][0].natija) {
                case '1':
                    return res.status(200).json({
                        code: 201,
                        success: {
                            message: {
                                uz: "Buyurtma saqlandi!",
                                en: "A new user has been created!",
                                ru: "Создан новый пользователь!"
                            }
                        }
                    })

                case '2':
                    return res.status(200).json({
                        code: 203,
                        error: {
                            message: {
                                uz: "Buyurtma holati o'zgartirildi !",
                                en: "User information has changed!",
                                ru: "Информация о пользователе изменилась!"
                            }
                        }
                    })

                case '3':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Bunday ID ega foydalanuvchi aniqlanmadi!",
                                en: "No such role found!",
                                ru: "Такой роли не найдено!"
                            }
                        }
                    })
                    case '4':
                        return res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Bunday ID ega maxsulot aniqlanmadi!",
                                    en: "No such role found!",
                                    ru: "Такой роли не найдено!"
                                }
                            }
                        })
                        case '5':
                            return res.status(200).json({
                                code: 400,
                                error: {
                                    message: {
                                        uz: "Bunday ID ega buyurtma mavjud emas!",
                                        en: "No such role found!",
                                        ru: "Такой роли не найдено!"
                                    }
                                }
                            })
                default:

                    return res.status(200).json({
                        code: 418,
                        success: {
                            message: {
                                uz: "Kutilmagan xatolik adminga xabar bering !",
                                en: "Report an unexpected error to the admin!",
                                ru: "Сообщите администратору о непредвиденной ошибке!"
                            }
                        }
                    })




            }

        }

    });

}


cartController.update = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.cart_update.validate(req.body);
    if (checked.error) {
        const msg = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: msg[0],
                    en: msg[1],
                    ru: msg[2]
                }
            }

        });
    }
    let a = req.body;
    var data = [a.id||-1,
         null,
        null,
        null,
        a.status
    ]

    cartModel.cart_edit_insert(data, function (err, result) {
        if (err) {
            console.log(err)
            return res.status(200).json({
                code: 500,
                error: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        en: "Rejected due to server error!",
                        ru: "Отклонено из-за ошибки сервера!"
                    }
                }
            })
        } else {
            // req.flash('success', 'Employee added succesfully');
            switch (result[0][0].natija) {
                case '1':
                    return res.status(200).json({
                        code: 201,
                        success: {
                            message: {
                                uz: "Buyurtma saqlandi!",
                                en: "A new user has been created!",
                                ru: "Создан новый пользователь!"
                            }
                        }
                    })

                case '2':
                    return res.status(200).json({
                        code: 203,
                        error: {
                            message: {
                                uz: "Buyurtma holati o'zgartirildi !",
                                en: "User information has changed!",
                                ru: "Информация о пользователе изменилась!"
                            }
                        }
                    })

                case '3':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Bunday ID ega foydalanuvchi aniqlanmadi!",
                                en: "No such role found!",
                                ru: "Такой роли не найдено!"
                            }
                        }
                    })
                    case '4':
                        return res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Bunday ID ega maxsulot aniqlanmadi!",
                                    en: "No such role found!",
                                    ru: "Такой роли не найдено!"
                                }
                            }
                        })
                        case '5':
                            return res.status(200).json({
                                code: 400,
                                error: {
                                    message: {
                                        uz: "Bunday ID ega buyurtma mavjud emas!",
                                        en: "No such role found!",
                                        ru: "Такой роли не найдено!"
                                    }
                                }
                            })
                default:

                    return res.status(200).json({
                        code: 418,
                        success: {
                            message: {
                                uz: "Kutilmagan xatolik adminga xabar bering !",
                                en: "Report an unexpected error to the admin!",
                                ru: "Сообщите администратору о непредвиденной ошибке!"
                            }
                        }
                    })




            }

        }

    });

}


cartController.delivered_create = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.delivered_create.validate(req.body);
    if (checked.error) {
        const msg = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: msg[0],
                    en: msg[1],
                    ru: msg[2]
                }
            }

        });
    }
    let a = req.body;
    var data = [0,
        a.cart_id || 0,
        a.comments || "",
        a.mark,
        null
    ]

    cartModel.delivered_edit_insert(data, function (err, result) {
        if (err) {
            console.log(err)
            return res.status(200).json({
                code: 500,
                error: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        en: "Rejected due to server error!",
                        ru: "Отклонено из-за ошибки сервера!"
                    }
                }
            })
        } else {
            // req.flash('success', 'Employee added succesfully');
            switch (result[0][0].natija) {
                case '1':
                    return res.status(200).json({
                        code: 201,
                        success: {
                            message: {
                                uz: "Buyurtma saqlandi!",
                                en: "A new user has been created!",
                                ru: "Создан новый пользователь!"
                            }
                        }
                    })

                case '2':
                    return res.status(200).json({
                        code: 203,
                        error: {
                            message: {
                                uz: "Buyurtma holati o'zgartirildi !",
                                en: "User information has changed!",
                                ru: "Информация о пользователе изменилась!"
                            }
                        }
                    })

                case '3':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Bunday ID ega foydalanuvchi aniqlanmadi!",
                                en: "No such role found!",
                                ru: "Такой роли не найдено!"
                            }
                        }
                    })
                    case '4':
                        return res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Bunday ID ega maxsulot aniqlanmadi!",
                                    en: "No such role found!",
                                    ru: "Такой роли не найдено!"
                                }
                            }
                        })
                        case '5':
                            return res.status(200).json({
                                code: 400,
                                error: {
                                    message: {
                                        uz: "Bunday ID ega buyurtma mavjud emas!",
                                        en: "No such role found!",
                                        ru: "Такой роли не найдено!"
                                    }
                                }
                            })
                default:

                    return res.status(200).json({
                        code: 418,
                        success: {
                            message: {
                                uz: "Kutilmagan xatolik adminga xabar bering !",
                                en: "Report an unexpected error to the admin!",
                                ru: "Сообщите администратору о непредвиденной ошибке!"
                            }
                        }
                    })




            }

        }

    });

}


cartController.delivered_update = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.delivered_update.validate(req.body);
    if (checked.error) {
        const msg = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: msg[0],
                    en: msg[1],
                    ru: msg[2]
                }
            }

        });
    }
    let a = req.body;
    var data = [a.id||-1,
         null,
        null,
        null,
        a.status
    ]

    cartModel.delivered_edit_insert(data, function (err, result) {
        if (err) {
            console.log(err)
            return res.status(200).json({
                code: 500,
                error: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        en: "Rejected due to server error!",
                        ru: "Отклонено из-за ошибки сервера!"
                    }
                }
            })
        } else {
            // req.flash('success', 'Employee added succesfully');
            switch (result[0][0].natija) {
                case '1':
                    return res.status(200).json({
                        code: 201,
                        success: {
                            message: {
                                uz: "Buyurtma saqlandi!",
                                en: "A new user has been created!",
                                ru: "Создан новый пользователь!"
                            }
                        }
                    })

                case '2':
                    return res.status(200).json({
                        code: 203,
                        error: {
                            message: {
                                uz: "Buyurtma holati o'zgartirildi !",
                                en: "User information has changed!",
                                ru: "Информация о пользователе изменилась!"
                            }
                        }
                    })

                case '3':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Bunday ID ega foydalanuvchi aniqlanmadi!",
                                en: "No such role found!",
                                ru: "Такой роли не найдено!"
                            }
                        }
                    })
                    case '4':
                        return res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Bunday ID ega maxsulot aniqlanmadi!",
                                    en: "No such role found!",
                                    ru: "Такой роли не найдено!"
                                }
                            }
                        })
                        case '5':
                            return res.status(200).json({
                                code: 400,
                                error: {
                                    message: {
                                        uz: "Bunday ID ega buyurtma mavjud emas!",
                                        en: "No such role found!",
                                        ru: "Такой роли не найдено!"
                                    }
                                }
                            })
                default:

                    return res.status(200).json({
                        code: 418,
                        success: {
                            message: {
                                uz: "Kutilmagan xatolik adminga xabar bering !",
                                en: "Report an unexpected error to the admin!",
                                ru: "Сообщите администратору о непредвиденной ошибке!"
                            }
                        }
                    })




            }

        }

    });

}

cartController.getAll = function (req, res) {
   cartModel.getAll(req.session.userId,(err,rows)=>{
    if (err) {
            console.log(err);
            return res.status(200).json({
                code: 500,
                error: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        en: "Rejected due to server error!",
                        ru: "Отклонено из-за ошибки сервера!"
                    }
                }
            })
        }
       
        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}






module.exports = cartController;