const express = require("express");
const router = express.Router();
const schema = require('../../models/category')
const pool = require('../../database/db');
const upload = require("../../middleware/upload")
const path=require("path")

router.get("/",(req,res)=>{
    pool.query(`select * from categories`,
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
        if(rows.length==0)
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: "Bunday Product",
                    en: "No such product found",
                    ru: "Такого producta не найдено"
                }
            }
        })
        else
        res.status(200).json({code:200,success:{data:rows}})
     })
})

router.get("/del/:id",(req,res)=>{
    pool.query(`delete from categories where id=?`,[req.params.id],
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
         res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: "Bunday Product",
                    en: "No such product found",
                    ru: "Такого producta не найдено"
                }
            }
        })
       
     })
})

router.post("/",  (req, res) => {
        //validatsiyada xatolik
        const checked = schema.category.validate(req.body);
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
    
    pool.query("call category_add(?)",[req.body.name],
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
            
                    res.status(200).json({
                        code: 201,
                        success: {
                            message: {
                                uz: "Kategoriya muvaffaqiyatli qo'shildi!",
                                en: "Image saved successfully!",
                                ru: "Rasm davolash saqlandi!"
                            }
                        }
                    })

                
});
});

module.exports = router;