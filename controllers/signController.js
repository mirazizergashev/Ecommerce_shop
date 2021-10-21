var userModel = require('../models/userModel');
const schema = require('../utils/user')
// const dateFormat = require('dateformat');

var signController = {


}


// qoshish
signController.signUp = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.signup.validate(req.body);
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
        0,
        3,
        "",
        "",
        a.tel,        
        a.parol,
       ""
    ]

    userModel.user_edit_insert(newUser, function (err,result) {
        if (err) {
           
            // req.flash('error', 'There was error in inserting data');
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
                                    ru: "Ранее введённый телефон номер уже существует, введите другой!"
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

// kirish
signController.signIn = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.signup.validate(req.body);
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
    var newUser=[a.tel,a.parol]

    userModel.user_login(newUser, function (err,result) {
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
            req.session.userId=parseInt(result[0][0].natija)
            switch (result[0][0].natija) {
                case '0':
                    return res.status(200).json({
                        code: 401,
                        error: {
                            message: {
                                uz: "Login yoki parol xato!",
                                en: "A new user has been created!",
                                ru: "Логин или пароль введен не правильно!"
                            }
                        }
                    })
break
                  
               
                default:
                req.session.userId=result[0][0].natija
                req.session.roleId=result[0][0].role_id
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Muvaffaqiyatli tizimga kirildi!",
                                en: "Report an unexpected error to the admin!",
                                ru: "Успешный вход в систему!"
                            }
                        }
                    })
                   break
                 
                
              
            }
    
        }
        
    });

}

// qoshish
signController.signOut = function (req, res) {
    req.session.destroy()
    res.status(200).json({
        code: 200,
        success: {
            message: "Tizimdan chiqdingiz !"
        }
    })
}

module.exports = signController;