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
        a.id,
        a.nom,
        a.izoh,
        a.narx,
        a.son,
        req.session.userId || 0,
        a.hol,
        a.kategoriya
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
                        success: {
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

//admin tasdiqlashi
productController.check_product = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.check_product.validate(req.body);
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
        a.product_id,
        a.hol,
        req.session.userId || 0,
        a.izoh
    ]

    productModel.check_product(data, function (err, result) {
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
            switch (parseInt(result[0][0].natija)) {
                case 0:
                    return res.status(200).json({
                        code: 200,
                        error: {
                            message: {
                                uz: "Maxsulot rad etildi!",
                                en: "Product Rejected!",
                                ru: "Товар отклонен!"
                            }
                        }
                    })

                case 1:
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Maxsulot qabul qilindi!",
                                en: "Product accepted!",
                                ru: "Товар принят!"
                            }
                        }
                    })

                    case 2:
                        return res.status(200).json({
                            code: 200,
                            success: {
                                message: {
                                    uz: "Maxsulot qabul qilindi!",
                                    en: "Product accepted!",
                                    ru: "Товар принят!"
                                }
                            }
                        })


                case 3:
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Maxsulot topilmadi!",
                                en: "No such product found!",
                                ru: "Такой product не найдено!"
                            }
                        }
                    })


                default:

                    return res.status(200).json({
                        code: 418,
                        error: {
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

//admin tasdiqlashi
productController.img_del = function (req, res) {

   
    let a = req.body;
    var data = [
        a.rasm
    ]

    productModel.img_del(data, function (err, result) {
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
            switch (parseInt(result[0][0].natija)) {
                case 0:
                
                case 1:
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Rasm ochirildi!",
                                en: "Product accepted!",
                                ru: "Товар принят!"
                            }
                        }
                    })


                case 2:
                    return res.status(200).json({
                        code: 400,
                        success: {
                            message: {
                                uz: "Rasm topilmadi!",
                                en: "No such product found!",
                                ru: "Такой product не найдено!"
                            }
                        }
                    })


                default:

                    return res.status(200).json({
                        code: 418,
                        error: {
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


//rasm yuklash
productController.product_image = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.product_image.validate(req.body);
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
        a.id,
        a.product_id,
        req.linkFile,
        a.hol
    ]

    productModel.product_image(data, function (err, result) {
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
            switch (parseInt(result[0][0].natija)) {
                
                case 1:
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Rasm qabul qilindi!",
                                en: "Image accepted!",
                                ru: "KaptuHka принят!"
                            }
                        }
                    })


                case 2:
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Rasm holati o`zgardi!",
                                en: "Picture status has changed!",
                                ru: "Статус изображения изменился!"
                            }
                        }
                    })


                default:

                    return res.status(200).json({
                        code: 404,
                        error: {
                            message: {
                                uz: "Maxsulot topilmadi!",
                                en: "No product found!",
                                ru: "Товар не найден!"
                            }
                        }
                    })




            }

        }

    });

}

productController.getAll = function (req, res) {
    productModel.getAll(req.params.id, req.session.userId,(err, rows) => {
    
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


productController.All = function (req, res) {
    productModel.All((err, rows) => {
 

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


productController.getOne = function (req, res) {
    productModel.getOne(req.params.id,(err, rows) => {
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

productController.Retcomment = function (req, res) {
    productModel.Retcomment(req.params.id,(err, rows) => {
 

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


productController.productFilter = function (req, res) {
    productModel.productFilter(req.query,(err, rows) => {
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
        a.id,
        a.product_id,
        a.cat_prop_id,
        a.qiymat,
        a.hol
    ]

    productModel.product_properties_edit_insert(data, function (err, result) {
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
    productModel.getProperties(req.params.id, (err, rows) => {
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

productController.getImage = function (req, res) {
    productModel.getImage(req.params.id, (err, rows) => {
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


productController.productByCategory = function (req, res) {
    productModel.productByCategory(req.query.id,(err, rows) => {
 

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

productController.prodPropsByValue = function (req, res) {
    productModel.prodPropsByValue(req.query.id,(err, rows) => {
 

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