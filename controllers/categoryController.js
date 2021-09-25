var categoryModel = require('../models/categoryModel');
const schema = require('../utils/category')

var categoryController = {}


categoryController.create_update = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.category.validate(req.body);
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
        a.sub||0,
        req.session.userId||0,
        a.foiz,
        a.hol,
        a.isFoiz
    ]

    categoryModel.category_edit_insert(data, function (err, result) {
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
                                uz: "Ma'lumotlar saqlandi!",
                                en: "A new user has been created!",
                                ru: "Создан новый пользователь!"
                            }
                        }
                    })

                case '2':
                    return res.status(200).json({
                        code: 203,
                        success: {
                            message: {
                                uz: "Ma'lumotlar o'zgartirildi !",
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
                                    uz: "Sub category topilmadi!",
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
                                        uz: "Foydalanuvchi topilmadi!",
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
                                        uz: "Kategoriya topilmadi!",
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
categoryController.delete = function (req, res) {
    categoryModel.delete(req.params.id,(err,rows)=>{
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
             success: {
                 message: {
                uz: "Muvaffaqiyatli o'chirildi !",
                en: "Rejected due to server error!",
                ru: "Отклонено из-за ошибки сервера!"
            }
        }
         })
     })
 }

categoryController.getAll = function (req, res) {
    categoryModel.getAll((err,rows)=>{
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
             success: rows[0],
             title:rows[1]
         })
     })
 }


 categoryController.getRegions = function (req, res) {
    categoryModel.getRegions(req.params.id,(err,rows)=>{
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
categoryController.getAllProp = function (req, res) {
    categoryModel.getAllProp((err,rows)=>{
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

categoryController.getType = function (req, res) {
    categoryModel.getType((err,rows)=>{
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



categoryController.getSub = function (req, res) {
    categoryModel.getSub(req.params.id,(err,rows)=>{
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
             success: rows[0],
             title:rows[1]
         })
     })
 }

//xususiyatlar

 categoryController.categoryPropertiesCU = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.category_properties.validate(req.body);
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
        a.category_id,
        a.tip_id,
        a.hol
    ]

    categoryModel.category_properties_edit_insert(data, function (err, result) {
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
                                uz: "Ma'lumotlar saqlandi!",
                                en: "A new user has been created!",
                                ru: "Создан новый пользователь!"
                            }
                        }
                    })

                case '2':
                    return res.status(200).json({
                        code: 203,
                        success: {
                            message: {
                                uz: "Ma'lumotlar o'zgartirildi !",
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
                                    uz: "Kategoriya topilmadi!",
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
                                        uz: "Berilgan ID ga ega tip topilmadi!",
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
                                        uz: "Bunday ID ga ega xususiyat mavjud emas!",
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


categoryController.getProperties = function (req, res) {
    categoryModel.getProperties(req.params.id,(err,rows)=>{
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


 categoryController.getPropertiesByCat = function (req, res) {
    categoryModel.getPropertiesByCat(req.params.id,(err,rows)=>{
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
         let result=[]
         for (let i = 0; i < rows[0].length; i++)
            result.push([rows[0][i],rows[i+1]])  
         
         res.status(200).json({
             code: 200,
             success: result
         })
     })
 }



 
categoryController.getSubs = function (req, res) {
    categoryModel.getSubs((err,rows)=>{
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



module.exports = categoryController;