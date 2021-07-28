var userModel = require('../models/userModel');
const schema = require('../utils/user')
// const dateFormat = require('dateformat');

var userController = {}

userController.update = function (req, res ) {

    //validatsiyada xatolik
    const checked = schema.signupdate.validate(req.body);
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
    let a=req.body;
    var newUser=[
        req.session.userId||-1,
        0,
        a.ism,
        a.fam,
        "",        
        "",
        a.address
    ]

    userModel.user_edit_insert(newUser, function (err,result) {
        if (err) {
            console.log(err)
            // req.flash('error', 'There was error in inserting data');
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
                        error: {
                            message: {
                                uz: "Yangi foydalanuvchi yaratildi !",
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
                                uz: "Foydalanuvchi ma'lumotlari o'zgardi !",
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
                                    uz: "Bunday rol topilmadi!",
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
                                    uz: "Bunday telefon mavjud!",
                                    en: "Such a phone is available!",
                                    ru: "Такой телефон есть!"
                                }
                            }
                        })
                        case '5':
                        return res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Bunday foydalanuvchi topilmadi!",
                                    en: "No such user found!",
                                    ru: "Такого пользователя не найдено!"
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

module.exports = userController;