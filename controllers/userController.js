var userModel = require('../models/userModel');
const schema = require('../utils/user')

var userController = {}

userController.update = function (req, res) {

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
    let a = req.body;
    var newUser = [
        req.session.userId || -1,
        3,
        a.ism || "",
        a.fam || "",
        "",
        "",
        a.address || ""
    ]

    userModel.user_edit_insert(newUser, function (err, result) {
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

userController.blok = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.blocked.validate(req.body);
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
    var newUser = [
        a.id,
        a.holat
    ]

    userModel.blok(newUser, function (err, result) {
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
            switch (parseInt(result[0][0].natija)) {
                case 1:
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Blokdan chiqarildi",
                                en: "A new user has been created!",
                                ru: "Создан новый пользователь!"
                            }
                        }
                    })

                    case 0:
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Blokga kiritildi",
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
                                uz: "Foydalanuvchi topilmadi !",
                                en: "User information has changed!",
                                ru: "Информация о пользователе изменилась!"
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

userController.getOneImg = function (req, res) {
    pool.query("select id from user_image where user_id=? and url=? limit 1", [req.session.userId, req.params.url || "non"], (err, rows, fields) => {
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
        if (rows.length == 0)
            return res.status(200).json({
                code: 400,
                error: {
                    message: {
                        uz: "Bunday fayl topilmadi",
                        en: "No such file found",
                        ru: "Такого файла не найдено"
                    }
                }
            })
        else
            res.status(200).sendFile(path.join(__dirname.substr(0, __dirname.length - 11), 'public/upload/users/' + req.params.url))
    })
}

userController.getAllImges = function (req, res) {
    pool.query("select id,url from user_image where user_id=?", req.session.userId, (err, rows, fields) => {
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

userController.uploadImg = function (req, res) {
    pool.query("call user_image_insert(?,?)", [req.session.userId, req.linkFile],
        (err, rows, fields) => {
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

            switch (rows[0][0].natija) {
                case '1':
                    res.status(200).json({
                        code: 201,
                        success: {
                            message: {
                                uz: "Rasm muvaffaqiyatli saqlandi!",
                                en: "Image saved successfully!",
                                ru: "Rasm davolash saqlandi!"
                            }
                        }
                    })

                    break;

                case '3':
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Bunday ID ga ega foydalanuvchi aniqlanmadi",
                                en: "No user with such an ID has been identified",
                                ru: "Ни одного пользователя с таким идентификатором не идентифицировано"
                            }
                        }
                    })
                    break;
            }
        })
}

userController.block = function (req, res) {
    //validatsiyada xatolik

    const checked = schema.blocked.validate(req.body);
    if (checked.error) {
        let s = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: s[0],
                    en: s[1],
                    ru: s[2]
                }
            }

        });
    }
    let a = req.body;
    pool.query("call blok_user(?,?)", [a.id, a.holat], (err, rows, fields) => {
        if (err) {
            console.error(err)
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
        switch (parseInt(rows[0][0].natija)) {

            case 0:
                res.status(200).json({
                    code: 400,
                    success: {
                        message: {
                            uz: "Foydalanuvchi bloklandi!",
                            ru: "Пользователь заблокирован!",
                            en: "User blocked!"
                        }
                    }
                })
                break;
            case 1:
                res.status(200).json({
                    code: 400,
                    success: {
                        message: {
                            uz: "Foydalanuvchi blokdan chiqarildi!",
                            ru: "Пользователь разблокирован!",
                            en: "User unblocked!"
                        }
                    }
                })
                break;

            default:
                res.status(200).json({
                    code: 404,
                    error: {
                        message: {
                            uz: "Bunday foydalanuvchi topilmadi!",
                            en: "No such user found!",
                            ru: "Такого пользователя не найдено!"
                        }
                    }
                })
                break;
        }
    })
}

userController.editPassword = function (req, res) {
    //validatsiyada xatolik

    const checked = schema.editPassword.validate(req.body);
    if (checked.error) {
        let s = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: s[0],
                    en: s[1],
                    ru: s[2]
                }
            }

        });
    }
    let { oldPass, newPass } = req.body;
    userModel.editPassword([req.session.userId || 0, oldPass, newPass], (err, rows) => {
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
        }

        switch (rows[0][0].natija) {
            case '2':
                return res.status(200).json({
                    code: 203,
                    success: {
                        message: {
                            uz: "Parol yangilandi!!",
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
                            uz: "Eski parol xato kiritildi!",
                            en: "No such role found!",
                            ru: "Такой роли не найдено!"
                        }
                    }
                })

            default:
                res.status(200).json({
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
    })

}

userController.getMe = function (req, res) {
    userModel.getMe(req.session.userId||0, (err, rows) => {

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


userController.getAllUsers = function (req, res) {
    userModel.getAllUsers((err, rows) => {
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

userController.rolEdit = function (req, res) {
    //validatsiyada xatolik
    const checked = schema.roledit.validate(req.body);
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
        a.rol,
        a.holat

    ]

    userModel.roleEdit(data, (err, rows) => {

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
        switch (rows[0][0].natija) {
            case '2':
                return res.status(200).json({
                    code: 203,
                    success: {
                        message: {
                            uz: "Ma'lumotlar yangilandi!!",
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
                            uz: "Foydalanuvchi aniqlanmadi!",
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
                            uz: "Rol topilmadi!",
                            en: "No such role found!",
                            ru: "Такой роли не найдено!"
                        }
                    }
                })
            default:
                res.status(200).json({
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
    })
}






module.exports = userController;