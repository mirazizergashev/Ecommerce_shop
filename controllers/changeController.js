var {smsToSalesmen} = require('../models/chatModel');
var {getDostavka} = require('../models/categoryModel');
var {mainRating} = require('../models/orderModel');
var {getSalesmen} = require('../models/userModel');
const schema = require('../utils/chat')

var changeController = {}


changeController.smsToSalesmen = function (req, res) {

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

    smsToSalesmen(data, function (err, result) {
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

changeController.getDostavka = function (req, res) {
    getDostavka(req.query.isAdmin||0,(err, rows) => {
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

changeController.mainRating=function (req, res) {
    mainRating((err, rows) => {
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
        rows[0].salesmen=rows[0].salesmen||0
        rows[0].customers=rows[0].customers||0
        rows[0].orders=rows[0].orders||0
        rows[0].benefit=rows[0].benefit||0
        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}


changeController.getSalesmen=function (req, res) {
    getSalesmen((err, rows) => {
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
module.exports = changeController;