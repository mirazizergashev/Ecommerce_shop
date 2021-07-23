const express = require("express");
const router = express.Router();
const schema = require('../../models/user')
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
    pool.query("call user_insert(0,?,?,?)", [a.fio, a.login, a.password],
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
                    res.status(200).json({
                        code: 201,
                        success: {
                            message: {
                                en: "You have successfully registered!",
                                uz: "Muvaffaqiyatli ro'yxatdan o'tdingiz!",
                                ru: "Вы успешно зарегистрировались!"
                            }
                        }
                    })

                    break;

                case '3':
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Bu  login bilan allaqachon ro'yxatdan o'tilgan!",
                                en: "This  login is already registered!",
                                ru: "Этот loginна уже зарегистрирован!"
                            }
                        }
                    })
                    break;
                case '4':
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Ushbu ID ga ega foydalanuvchi foydalanuvchi aniqlanmadi!",
                                ru: "Пользователь с таким идентификатором не идентифицирован!",
                                en: "The user with this ID has not been identified!"
                            }
                        }
                    })
                    break;
                case '2':
                    res.status(200).json({
                        code: 203,
                        error: {
                            message: {
                                uz: "Muvaffaqiyatli yangilandi!",
                                en: "Successfully updated!",
                                ru: "Успешно обновлено!"
                            }
                        }
                    })
                    break;
                default:
                    res.status(200).json({
                        code: 418,
                        error: {
                            message: {
                                ru: "Произошла незамеченная ошибка",
                                uz: "E'tiborga olinmagan xatolik yuz berdi",
                                en: "An unnoticed error occurred"
                            }
                        }
                    })
                    break;
            }


        })


});

//LOg in
router.post("/in", async (req, res) => {
    //validatsiyada xatolik
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    const device=req.headers["user-agent"]
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
    pool.query("call sign_in(?,?,?,?)", [a.login, a.password||1,ip||'not found',device||"Desctop"], (err, rows, fields) => {
        if (err){
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