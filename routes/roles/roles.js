const express = require("express");
const router = express.Router();
const schema = require('../../models/roles')
const Joi = require("joi");
const pool = require('../../database/db');
// const ccode = require('../../middleware/sign');


//rollarni olish user asosida
router.get('/', (req, res) => {
    console.log(req.session.userId)
    pool.query(`SELECT r.* FROM roles r
    WHERE r.id IN (SELECT role_id FROM users_roles ur WHERE ur.user_id =?);`, [req.session.userId], (err, rows, fields) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                error: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        ru: "Отклонено из-за ошибки сервера!",
                        en: "Rejected due to server error!"
                    }
                }
            })}

        
            res.status(200).json({ success: { data: rows } })
    });
});



router.get('/all', (req, res) => {
    pool.query(" SELECT r.id,r.name as rol, d.name as depart FROM roles r inner join department d on r.depart_id=d.id ",(err, rows, fields) => {
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
router.post("/add_rol", async (req, res) => {

    //validatsiyada xatolik
    const checked = schema.role.validate(req.body);
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
    pool.query("call rol_edit_insert(?,?,?,?,?)", [a.id, a.name, a.url,a.hol,a.bolim||1], (err, rows, fields) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                error: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        ru: "Отклонено из-за ошибки сервера!",
                        en: "Rejected due to server error!"
                    }
                }
            })
        }
        console.log(rows[0][0])
        switch (rows[0][0].natija) {
            case '1':
                res.status(201).json({
                    success: {
                        message: {
                            uz: "Rol yaratildi !",
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
                            uz: "Rol o'zgartirildi !",
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
                            uz: "Bunday rol mavjud emas !",
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