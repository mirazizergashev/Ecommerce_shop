const express = require("express");
const router = express.Router();
const schema = require('../../models/roles_pages')
const pool = require('../../database/db');


//rollarni olish user asosida
router.get('/', (req, res) => {
    pool.query(`SELECT id, full_name FROM shafran.users where active=1;`,  (err, rows, fields) => {
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
        
            return res.status(200).json({
                success: {
                    data: {
                        uz: rows

                    }
                }
            })
    });
});

router.get('/all', (req, res) => {
    pool.query(`SELECT id, full_name,login FROM shafran.users where active=1;`,  (err, rows, fields) => {
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
        
            return res.status(200).json({
                success: {
                    data: {
                        uz: rows

                    }
                }
            })
    });
});


router.get('/my', (req, res) => {
    pool.query(`SELECT id,login, full_name FROM shafran.users where id=${req.session.userId};`,  (err, rows, fields) => {
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
        
            return res.status(200).json({
                success: {
                    data: {
                        uz: rows

                    }
                }
            })
    });
});

router.post("/blok", async (req, res) => {

    //validatsiyada xatolik
    const checked = schema.human.validate(req.body);
    if (checked.error) {
        // let a = req.body;
        console.log(req.body);
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
    pool.query("call blok(?)", [a.user_id], (err, rows, fields) => {
        if (err)
            return res.status(500).json({
                success: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        ru: "Отклонено из-за ошибки сервера!",
                        en: "Rejected due to server error!"
                    }
                }
            })
     
        switch (rows[0][0].natija) {
            case 1:
                res.status(200).json({
                    success: {
                        message: {
                            uz: "Foydalanuvchi bloklandi!",
                            ru: "Пользователь заблокирован!",
                            en: "User blocked!"
                        }
                    }
                })
                break;

                case '1':
                res.status(200).json({
                    success: {
                        message: {
                            uz: "Foydalanuvchi bloklandi!",
                            ru: "Пользователь заблокирован!",
                            en: "User blocked!"
                        }
                    }
                })
                break;
            case 2:
                res.status(200).json({
                    success: {
                        message: {
                            uz: "Foydalanuvchi blokdan chiqarildi!",
                            ru: "Пользователь разблокирован!",
                            en: "User unblocked!"
                        }
                    }
                })
                break;

                case '2':
                res.status(200).json({
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
                res.status(404).json({
                    error: {
                        message: {
                            uz: "Foydalanuvchi topilmadi!",
                            ru: "Пользователь не найден!",
                            en: "User not found!"
                        }
                    }
                })
                break;
        }


    })


});








module.exports = router;