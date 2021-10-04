var paymentModel = require('../models/paymentModel');
const schema = require('../utils/product')

var paymentController = {}


paymentController.getAllSuccessPayment = function (req, res) {
    paymentModel.getAllSuccessPayment((err, rows) => {
    
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


paymentController.getCuryerProd = function (req, res) {
    paymentModel.getCuryerProd(req.body.id, (err, rows) => {
    
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

paymentController.getOrdersAll = function (req, res) {
    paymentModel.getOrdersAll( (err, rows) => {
    
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

paymentController.getOrdersIn = function (req, res) {
    paymentModel.getOrdersIn(req.params.id,(err, rows) => {
    
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

paymentController.getOrdersAllCustomer = function (req, res) {
    paymentModel.getOrdersAllCustomer( (err, rows) => {
    
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




module.exports = paymentController;