var dostavkaModel = require('../models/dostavkaModel');
const schema = require('../utils/dostavka')

var dostavkaController = {}


dostavkaController.create_update = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.dostavka.validate(req.body);
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
        a.name ,
        a.cost||0,
        a.isActive,
        req.session.userId||0
    ]

    dostavkaModel.dostavka_edit_insert(data, function (err, result) {
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
                                    uz: "Sizga ushbu amalni bajarishga ruxsat berilmagan!",
                                    en: "No such role found!",
                                    ru: "Такой роли не найдено!"
                                }
                            }
                        })
                        case '403':
                            return res.status(200).json({
                                code: 403,
                                error: {
                                    message: {
                                        uz: "Foydalanuvchi topilmadi!",
                                        en: "No such role found!",
                                        ru: "Такой роли не найдено!"
                                    }
                                }
                            })
                default:
                console.log(result[0][0].natija)
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


dostavkaController.getAll = function (req, res) {
    dostavkaModel.getAll(req.session.roleId,(err,rows)=>{
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


module.exports = dostavkaController;