var chatModel = require('../models/chatModel');
const schema = require('../utils/chat')

var chatController = {}


chatController.send_edit = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.chatAll.validate(req.body);
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
    var data = [a.user_id, a.text,1]

    chatModel.chat_edit_insert(data, function (err, result) {
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
                                uz: "Xabar jo'natildi !",
                                en: "A new user has been created!",
                                ru: "Создан новый пользователь!"
                            }
                        }
                    })

             
                case '2':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Berilgan ID ga ega foydalanuvchi topilmadi!",
                                en: "No such subject found!",
                                ru: "Такой subject не найдено!"
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

chatController.smsAdmin = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.chatAdmin.validate(req.body);
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
    var data = [a.text]

    chatModel.smsAdmin(data, function (err, result) {
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
         
                    return res.status(200).json({
                        code: 203,
                        success: {
                            message: {
                                uz: "Xabar jo'natildi !",
                                en: "A new user has been created!",
                                ru: "Создан новый пользователь!"
                            }
                        }
                    })


        }

    });

}

chatController.chatStop = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.chatStop.validate(req.body);
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
    var data = [a.user_id]

    chatModel.chatStop(data, function (err, result) {
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
         
                    return res.status(200).json({
                        code: 203,
                        success: {
                            message: {
                                uz: "Xabarlar korildi !",
                                en: "A new user has been created!",
                                ru: "Создан новый пользователь!"
                            }
                        }
                    })


        }

    });

}

chatController.getChatId = function (req, res) {
    chatModel.getChatId(req.params.id,(err, rows) => {
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



chatController.getMyMessage = function (req, res) {
    chatModel.getMyMessage(req.session.userId,(err, rows) => {
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


chatController.getChats = function (req, res) {
    chatModel.getChats(req.query.isAdmin||0,(err, rows) => {
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

module.exports = chatController;