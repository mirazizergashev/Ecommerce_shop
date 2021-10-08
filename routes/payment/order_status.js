const express = require("express");
const app = express();
const schema = require('../../utils/order')


const pool = require("../../database/db");

app.post("/orderStatus", async (req, res) => {
 //validatsiyada xatolik
 const checked = schema.order_status.validate(req.body);
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
     a.order_id || 0,
     req.session.userId || 0,
     a.status
 ]

 pool.query("call order_status(?,?,?)",data,function(err,result,field){
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
                    code: 201,
                    success: {
                        message: {
                            uz: "Buyurmaning holati saqlandi!",
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
                            uz: "Bunday odam topilmadi !",
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
                            uz: "Bunday buyurtma topilmadi!",
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
                            uz: "Bunday status topilmadi!",
                            en: "No such role found!",
                            ru: "Такой роли не найдено!"
                        }
                    }
                })
           
            default:

                return res.status(200).json({
                    code: 418,
                    error: {
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


})


module.exports = app;