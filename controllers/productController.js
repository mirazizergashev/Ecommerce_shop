var productModel = require('../models/productModel');
const schema = require('../utils/product')

var productController = {}


productController.create_update = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.product.validate(req.body);
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
    var data = [
        a.id ,
        a.nom ,
        a.izoh,
        a.narx,
        a.son,
        req.session.userId||0,
        a.hol
    ]

    productModel.product_edit_insert(data, function (err, result) {
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
                                uz: "Yangi maxsulot yaratildi!",
                                en: "New product created!",
                                ru: "Создан новый продукт!"
                            }
                        }
                    })

                case '2':
                    return res.status(200).json({
                        code: 203,
                        error: {
                            message: {
                                uz: "Maxsulot o'zgartirildi !",
                                en: "Product changed!",
                                ru: "Товар изменен!"
                            }
                        }
                    })

                    
                        case '3':
                            return res.status(200).json({
                                code: 400,
                                error: {
                                    message: {
                                        uz: "Foydalanuvchi topilmadi!",
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


productController.getAll = function (req, res) {
   productModel.getAll((err,rows)=>{
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




//xususiyatlar

 productController.productPropertiesCU = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.product_properties.validate(req.body);
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
    var data = [
        a.id ,
        a.product_id,
        a.cat_prop_id,
        a.qiymat ,
        a.hol
    ]

    productModel.category_properties_edit_insert(data, function (err, result) {
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
                        code: 203,
                        success: {
                            message: {
                                uz: "Maxsulot xusuiyati saqlandi!",
                                en: "Product feature saved!",
                                ru: "Функция продукта сохранена!"
                            }
                        }
                    })

                case '2':
                    return res.status(200).json({
                        code: 203,
                        error: {
                            message: {
                                uz: "Maxsulot xusuiyati o'zgartirildi !",
                                en: "Product feature changed!",
                                ru: "Характеристики продукта изменены!"
                            }
                        }
                    })

                    case '3':
                        return res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Maxsulot topilmadi!",
                                    en: "No product found!",
                                    ru: "Товар не найден!"
                                }
                            }
                        })
                        case '4':
                            return res.status(200).json({
                                code: 400,
                                error: {
                                    message: {
                                        uz: "Kategoriya xususiyati topilmadi!",
                                        en: "Category feature not found!",
                                        ru: "Функция категории не найдена!"
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


productController.getProperties = function (req, res) {
    productModel.getProperties(req.params.id,(err,rows)=>{
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


module.exports = productController;