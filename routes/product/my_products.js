const express = require("express");
const router = express.Router();
const schema = require('../../models/product')
const Joi = require("joi");
const pool = require('../../database/db');

router.get("/",(req,res)=>{
    pool.query(`select * from product where users_roles_id in 
    (select id from users_roles where user_id=? and role_id=?)`,[req.session.userId,req.session.roleId],
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






module.exports = router;