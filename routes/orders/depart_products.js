const express = require("express");
const router = express.Router();
const schema = require('../../models/order.js')
const pool = require('../../database/db');
const path = require("path")

router.get("/",(req,res)=>{
    pool.query(`SELECT id,name,DATE_FORMAT(created_on, "%d-%m-%Y, %h:%m:%s") created_on FROM department where id not in (1,5);`//,[req.session.departId||0]
    , 
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
                code: 200,
                success: {
                        data: rows
                }
            })
        })
})

router.get("/:id",(req,res)=>{
    pool.query(`select distinct u.id,u.full_name,r.name role_name from users u 
    inner join users_roles ur on ur.user_id=u.id
    inner join roles r on r.id=ur.role_id and r.depart_id=?;`, 
    [req.params.id||0],
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
                code: 200,
                success: {
                        data: rows
                }
            })
        })
})

router.get("/departs",(req,res)=>{
    pool.query(`SELECT DISTINCT  rol departs,r.name FROM shafran.product_head p
    inner join roles r on p.rol=r.id ;`, 
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
                code: 200,
                success: {
                        data: rows
                }
            })
        })
})

module.exports = router;