const express = require("express");
const router = express.Router();
const schema = require('../../utils/user')
const pool = require('../../database/db');



//log out bolish
router.get('/out', (req, res) => {
    req.session.destroy()
    res.status(200).json({
        code: 200,
        success: {
            message: "Tizimdan chiqdingiz !"
        }
    })
});

//royhatdan otish
router.post("/up", async (req, res) => {

    //validatsiyada xatolik
    const checked = schema.signup.validate(req.body);
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
    pool.query("call user_edit_insert(0,?,?,?,?,?)", [a.rol, a.ism, a.fam, a.tel, a.parol],
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
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Yangi foydalanuvchi yaratildi !",
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

        })


});

//LOg in
router.post("/in", async (req, res) => {
    //validatsiyada xatolik

    const checked = schema.signin.validate(req.body);
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
    pool.query("call login_check(?,?)", [a.tel, a.parol], (err, rows, fields) => {
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
        // console.log(rows)
        switch (rows[0][0].natija) {
            case 0:
                res.status(200).json({
                    code: 400,
                    error: {
                        message: {
                            uz: "Siz ko'rsatgan telefon va / yoki parol noto'g'ri.",
                            ru: "Вы указали неверный телефон и / или пароль.",
                            en: "The phone and/or password you specified are not correct."
                        }
                    }
                })
                break;
            case '0':
                res.status(200).json({
                    code: 400,
                    error: {
                        message: {
                            uz: "Siz ko'rsatgan telefon va / yoki parol noto'g'ri.",
                            ru: "Вы указали неверный телефон и / или пароль.",
                            en: "The phone and/or password you specified are not correct."
                        }
                    }
                })
                break;

            default:
                req.session.userId = rows[0][0].natija;
                res.status(200).json({
                    code: 200,
                    success: {
                        message: {
                            uz: "Tizimga xush kelibsiz !",
                            ru: "Добро пожаловать в систему!",
                            en: "Welcome to the system!"
                        }
                    }
                })
                break;
        }
    })
});





module.exports = router;