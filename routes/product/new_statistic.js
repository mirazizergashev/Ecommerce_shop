const express = require("express");
const router = express.Router();
const schema = require('../../models/product')
const Joi = require("joi");
const pool = require('../../database/db');


router.get("/sotuv",(req,res)=>{
    let {category,from,to}=req.params
    if(category==0)category='p.category_id'
   
    
    pool.query(`select p.name mahsulot, sum(o.cost*o.count) narx,u.full_name masul,date_format(o.created_on,"%Y-%m-%d") sana  from orders o
    inner join product p on p.id=o.product_id inner join users_roles ur on ur.id=p.users_roles_id inner join users u
    on u.id=ur.user_id where  o.created_on>${from} and  o.created_on<${to} and 
    p.category_id=${category} group by DATE(o.created_on)`, 
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