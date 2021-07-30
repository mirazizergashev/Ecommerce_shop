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
        a.sub,
        a.user_id,
        a.foiz,
        a.hol
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
                        error: {
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
             success: rows
         })
     })
 }




module.exports = categoryController;