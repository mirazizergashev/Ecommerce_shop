const express = require("express");
const router = express.Router();
const schema = require('../../models/roles_pages')
const pool = require('../../database/db');


//rollarni olish user asosida
router.get('/getusers/:id', (req, res) => {
    pool.query(`SELECT distinct u.* FROM users_roles ur inner join users u on u.id=ur.user_id and ur.role_id=?;`,
    [req.params.id],  (err, rows, fields) => {
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

//rollarni olish user asosida
router.get('/', (req, res) => {
    pool.query(`select ur.id,r.name role,u.full_name, DATE_FORMAT(ur.addtime, "%d-%m-%Y, %h:%m:%s") created_on from users_roles ur
    inner join users u on u.id=ur.user_id
    inner join roles r on r.id=ur.role_id`,  (err, rows, fields) => {
        if (err){
            console.error(err)
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




router.post("/", async (req, res) => {

    //validatsiyada xatolik
    const checked = schema.users_roles.validate(req.body);
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
    // pool.promise().query('select 5*5;').then()
    pool.query("call user_role_edit_insert(?,?,?,?);", [a.id || 0, a.user_id, a.role_id, a.active], (err, rows, fields) => {
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
                            uz: "Foydalanuvchiga rol muvaffaqiyatli biriktirildi !",
                            ru: "Роль пользователя успешно прикреплена!",
                            en: "User role successfully attached!"
                        }
                    }
                })
                break;
            case '2':
                res.status(200).json({
                    success: {
                        message: {
                            uz: "Foydalanuvchi va rolning bog'lanish holati o'zgartirildi!",
                            ru: "Статус подключения пользователя и роли изменен!",
                            en: "User and role connection status changed!"
                        }
                    }
                })
                break;
            case '3':
                res.status(400).json({
                    error: {
                        message: {
                            uz: "Berilgan ID ga ega foydalanuvchi mavjud emas!",
                            ru: "Нет пользователя с данным ID!",
                            en: "There is no user with the given ID!"
                        }
                    }
                })
                break;
            case '4':
                res.status(400).json({
                    error: {
                        message: {
                            uz: "Berilgan ID ga ega rol mavjud emas!",
                            ru: "Роли с данным ID нет!",
                            en: "There is no role with a given ID!"
                        }
                    }
                })
                break;
            case '5':
                res.status(400).json({
                    error: {
                        message: {
                            uz: "Berilgan ID ga ega bog'lanish mavjud emas!",
                            ru: "Нет ссылки с данным ID!",
                            en: "There is no link with the given ID!"
                        }
                    }
                })
                break;
            case '6':
                res.status(403).json({
                    error: {
                        message: {
                            uz: "Ushbu foydalanuvchiga tanlagan rol allaqachon biriktirilgan",
                            ru: "Вам не разрешено использовать эту информацию",
                            en: "You are not allowed to use this information"
                        }
                    }
                })
                break;
            default:
                res.status(418).json({
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