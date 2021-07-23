const express = require("express");
const router = express.Router();
// const schema = require('../../models/user')
const pool = require('../../database/db');
const upload = require("../../middleware/upload")
const path=require("path")

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

module.exports = router;