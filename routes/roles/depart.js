const express = require("express");
const router = express.Router();
const schema = require('../../models/roles')
const Joi = require("joi");
const pool = require('../../database/db');
// const ccode = require('../../middleware/sign');


//rollarni olish user asosida

router.get('/all', (req, res) => {
    pool.query(`SELECT id,name,DATE_FORMAT(created_on, "%d-%m-%Y, %h:%m:%s") created_on FROM department;`,[req.session.departId||0],(err, rows, fields) => {
        if (err)
            return res.status(500).json({
                error: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        ru: "Отклонено из-за ошибки сервера!",
                        en: "Rejected due to server error!"
                    }
                }
            })

        // bu shunchaki get
        
        
        res.status(200).json({ success: { data: rows } })
    });
});

//rol qoshish 
router.post("/add_depart", async (req, res) => {

    //validatsiyada xatolik
    const checked = schema.depart.validate(req.body);
    if (checked.error) {
        console.log(checked.error)
        const msg=checked.error.details[0].message.split("#")
        return res.status(200).json({
            code:400,
            error: {
                message: {
                    uz:msg[0],
                    en:msg[1],
                    ru:msg[2]
                }
            }

        });
    }

    let a = req.body;
    console.log(a);
    //ana shu yer ozgaradi 10 emas session asosida kelinadigan yoki select qilib paramsdan olinadi
    pool.query("call department_edit_insert(?,?)", [a.id, a.name], (err, rows, fields) => {
        if (err)
            return res.status(500).json({
                error: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        ru: "Отклонено из-за ошибки сервера!",
                        en: "Rejected due to server error!"
                    }
                }
            })
        console.log(rows[0][0])
        switch (rows[0][0].natija) {
            case '1':
                res.status(201).json({
                    success: {
                        message: {
                            uz: "Bolim yaratildi !",
                            ru: "Роль создана!",
                            en: "Role created!"
                        }
                    }
                })
                break;
            case '2':
                res.status(200).json({
                    success: {
                        message: {
                            uz: "Bolim o'zgartirildi !",
                            ru: "Роль изменилась!",
                            en: "Role changed!"
                        }
                    }
                })
                break;
                case '4':
                res.status(400).json({
                    error: {
                        message: {
                            uz: "Bunday bolim mavjud emas !",
                            ru: "There is no such role!",
                            en: "Нет такой роли!"
                        }
                    }
                })
                break;
                
            default:
                res.status(404).json({
                    error: {
                        message: {
                            uz: "Kutilmagan holat yoki server xatosi !",
                            ru: "Неожиданная ситуация или ошибка сервера!",
                            en: "Unexpected situation or server error!"
                        }
                    }
                })
                break;
        }


    })


});







module.exports = router;