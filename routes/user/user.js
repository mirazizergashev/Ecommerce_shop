const express = require("express");
const router = express.Router();
const schema = require('../../utils/user')
const pool = require('../../database/db');
const upload = require("../../middleware/upload")
const path=require("path")
const userController=require("../../controllers/userController")


routes.post('/user/update',userController.update);
router.get("/img/:url",(req,res)=>{
    pool.query("select id from user_image where user_id=? and url=? limit 1",[req.session.userId,req.params.url||"non"], (err, rows, fields) => {
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
        if(rows.length==0)
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: "Bunday fayl topilmadi",
                    en: "No such file found",
                    ru: "Такого файла не найдено"
                }
            }
        })
        else
        res.status(200).sendFile(path.join(__dirname.substr(0,__dirname.length-11), 'public/upload/users/'+req.params.url))
    }) 
})

router.get("/images", (req, res) => {
    pool.query("select id,url from user_image where user_id=?",req.session.userId, (err, rows, fields) => {
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
            success:rows
        })
    })
})

router.post("/img", upload, async (req, res) => {
    pool.query("call user_image_insert(?,?)", [req.session.userId, req.linkFile],
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
                                uz: "Rasm muvaffaqiyatli saqlandi!",
                                en: "Image saved successfully!",
                                ru: "Rasm davolash saqlandi!"
                            }
                        }
                    })

                    break;

                case '3':
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Bunday ID ga ega foydalanuvchi aniqlanmadi",
                                en: "No user with such an ID has been identified",
                                ru: "Ни одного пользователя с таким идентификатором не идентифицировано"
                            }
                        }
                    })
                    break;
            }
        })
});

//blok qilish
router.post("/block", async (req, res) => {
    //validatsiyada xatolik

    const checked = schema.blocked.validate(req.body);
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
    pool.query("call blok_user(?,?)", [a.id, a.holat], (err, rows, fields) => {
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
        switch (parseInt(rows[0][0].natija)) {
            
            case 0:
                res.status(200).json({
                    code: 400,
                    success: {
                        message: {
                            uz: "Foydalanuvchi bloklandi!",
                            ru: "Пользователь заблокирован!",
                            en: "User blocked!"
                        }
                    }
                })
                break;
                case 1:
                    res.status(200).json({
                        code: 400,
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
                res.status(200).json({
                    code: 404,
                    error: {
                        message: {
                                uz: "Bunday foydalanuvchi topilmadi!",
                                en: "No such user found!",
                                ru: "Такого пользователя не найдено!"
                            }
                    }
                })
                break;
        }
    })
});

module.exports = router;