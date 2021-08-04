var promokodModel = require('../models/promokodModel');
const schema = require('../utils/promokod')

var promokodController = {}


promokodController.generate = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.promokod.validate(req.body);
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
        a.token || 0,
        a.user_id ,
        a.isFoiz,
        a.amount
    ]

    promokodModel.promokod_edit_insert(data, function (err, result) {
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
                                uz: "Promokod generatsiya qilindi!",
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
                                uz: "Foydalanuvchi biriktirildi!",
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
                                uz: "Bunday tokenli promokod topilmadi!",
                                en: "No such promokod found!",
                                ru: "Такой роли не найдено!"
                            }
                        }
                    })
               
                    case '4':
                        return res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Bunday  promokod allaqachon boshqa foydalanuvchiga berilgan!",
                                    en: "No such promokod found!",
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


promokodController.getAll = function (req, res) {
   promokodModel.getAll((err,rows)=>{
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






module.exports = promokodController;