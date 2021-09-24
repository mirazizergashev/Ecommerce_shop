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
        a.id || "create",
        req.session.userId,
        a.amount,
        a.isFoiz,
        a.deadline,
        a.count,
        a.description

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
            switch (result[0][0].natija) {
                case '1':
                    return res.status(200).json({
                        code: 201,
                        success: {
                            message: {
                                uz: "Promokod generatsiya qilindi!",
                                en: "A new user has been created!",
                                ru: "Создан новый пользователь!"
                            },
                            token: result[0][0].token
                        }
                    })

                case '2':
                    return res.status(200).json({
                        code: 203,
                        success: {
                            message: {
                                uz: "Ma'lumotlar tahrirlandi!",
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
                case '10':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Promokodga o'tib bo'lgan vaqtni deadline sifatida berish mumkin emas!",
                                en: "No such promokod found!",
                                ru: "Такой роли не найдено!"
                            }
                        }
                    })
                case '11':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Promokodning yaroqlilik muddati tugagan!",
                                en: "No such promokod found!",
                                ru: "Такой роли не найдено!"
                            }
                        }
                    })
                case '5':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Bunday ID ga ega foydalanuvchi topilmadi!",
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


promokodController.attacheUser = function (req, res) {

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
    if (a.token == "create") a.token = ""
    var data = [
        a.token,
        req.session.userId,
        null,
        null,
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
            switch (result[0][0].natija) {
                case '1':
                    return res.status(200).json({
                        code: 201,
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
                case '5':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Bunday ID ga ega foydalanuvchi topilmadi!",
                                en: "No such promokod found!",
                                ru: "Такой роли не найдено!"
                            }
                        }
                    })
                case '10':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Promokodga o'tib bo'lgan vaqtni deadline sifatida berish mumkin emas!",
                                en: "No such promokod found!",
                                ru: "Такой роли не найдено!"
                            }
                        }
                    })
                case '11':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Promokodning yaroqlilik muddati tugagan!",
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

promokodController.update = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.promokodUpdate.validate(req.body);
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
        a.amount,
        a.isFoiz,
        a.deadline,
        0
    ]

    promokodModel.promokod_edit(data, function (err, result) {
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

                case '2':
                    return res.status(200).json({
                        code: 203,
                        error: {
                            message: {
                                uz: "Promokod muvaffaqiyatli tahrirlandi!",
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
                                uz: "Bunday ID ga ega promokod topilmadi!",
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
                case '11':
                    return res.status(200).json({
                        code: 200,
                        error: {
                            message: {
                                uz: "Promokod o'chirildi!",
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

promokodController.delete = function (req, res) {


    var data = [
        req.params.id,
        null,
        null,
        null,
        1
    ]

    promokodModel.promokod_edit(data, function (err, result) {
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

                case '2':
                    return res.status(200).json({
                        code: 203,
                        success: {
                            message: {
                                uz: "Promokod muvaffaqiyatli tahrirlandi!",
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
                                uz: "Bunday ID ga ega promokod topilmadi!",
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
                case '11':
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Promokod o'chirildi!",
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
    console.log(req.query)
    promokodModel.getAll(req.query, (err, rows) => {
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


promokodController.getBusy = function (req, res) {
    promokodModel.getBusy(req.query, (err, rows) => {
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

promokodController.getFresh = function (req, res) {
    promokodModel.getFresh(req.query, (err, rows) => {
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