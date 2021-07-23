const express = require("express");
const router = express.Router();
const schema = require('../../models/product')
const Joi = require("joi");
const pool = require('../../database/db');


router.get("/share_sklad/:depart/:category/:day",(req,res)=>{
    let {category,depart,day}=req.params
    if(category==0)category='s.category_id'
    if(depart==0)depart='d2.id'
    if(day==0)day=365*100
    
    pool.query(`
    SELECT sp.id,sp.count,s.name,u1.full_name from_name,d1.name from_depart,
        u2.full_name to_name,d2.name to_depart,date_format(sp.created_on,'%d-%m-%Y %h:%i:%s') created_on 
        FROM share_product_sklad sp 
        inner join sklad s on s.id=sp.product_id
        inner join users u1 on u1.id=sp.from_id
        inner join users u2 on u2.id=sp.to_id
        inner join department d1 on d1.id=sp.fdepart_id
        inner join department d2 on d2.id=sp.tdepart_id
        where s.category_id=${category} and d2.id=${depart} and 
        sp.created_on >= DATE_ADD(CURDATE(), INTERVAL - ${day} DAY);`, 
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

router.get("/share_product/:depart/:category/:day",(req,res)=>{
    let {category,depart,day}=req.params
    if(category==0)category='s.category_id'
    if(depart==0)depart='d2.id'
    if(day==0)day=365*100
    
    pool.query(`
    SELECT sp.id,sp.count,s.name,u1.full_name from_name,d1.name from_depart,
        u2.full_name to_name,d2.name to_depart,date_format(sp.created_on,'%d-%m-%Y %h:%i:%s') created_on 
        FROM share_product sp 
        inner join product s on s.id=sp.product_id
        inner join users u1 on u1.id=sp.from_id
        inner join users u2 on u2.id=sp.to_id
        inner join department d1 on d1.id=sp.fdepart_id
        inner join department d2 on d2.id=sp.tdepart_id
        where s.category_id=${category} and d2.id=${depart} and 
        sp.created_on >= DATE_ADD(CURDATE(), INTERVAL - ${day} DAY);`, 
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
router.get("/product/:kun/:category",(req,res)=>{
    let kateg=req.params.category
    if(req.params.category==0){
        kateg='p.category_id'
    }
    pool.query(`SELECT  p.id as id,p.name as mahsulot, ap.count as qancha,ap.cost*ap.count as narx,date_format(ap.created_on, "%d-%m-%y %h:%m") as vaqt 
    FROM add_product ap inner join sklad p on ap.product_id=p.id 
    where (ap.created_on > now() - interval ${req.params.kun} day) and ap.isSklad=1 and p.category_id=${kateg}`,
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
        
           
            res.status(200).json({code:200,success:{data:rows}})
        
     })
})


router.get("/boss_mijoz/:kun",(req,res)=>{
    
    pool.query(`SELECT o.id as id,o.count*o.cost as narx,date_format(o.created_on,"%y-%m-%d %h:%i:%s") as vaqt FROM main_orders mo 
    inner join orders  o on mo.id=o.main_order_id where 
    o.created_on> now() - interval ${req.params.kun} day`, 
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

router.get("/cutumers_daily/:day",(req,res)=>{
    
    pool.query(`SELECT count(id) custumers, date_format(created_on,"%Y-%m-%d") date FROM main_orders where 
    created_on> now() - interval ${req.params.day||7} day
    group by  DATE(created_on);`, 
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

router.get("/benefit_daily/:day",(req,res)=>{
    
    pool.query(`select sum(count*cost) summa,date_format(created_on,"%Y-%m-%d") date  from orders
    where  created_on> now() - interval ${req.params.day||7} day
         group by DATE(created_on)`, 
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

router.get("/outlay_daily/:day",(req,res)=>{
    
    pool.query(`SELECT  p.id as id,p.name as mahsulot, sum(ap.cost*ap.count) as narx,
    date_format(ap.created_on, "%d-%m-%y") as vaqt 
        FROM add_product ap inner join sklad p on ap.product_id=p.id 
        where (ap.created_on > now() - interval ${req.params.day||1} day)  and ap.isSklad=1  group by  DATE(ap.created_on);`, 
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

router.get("/boss_ovqat/:kun",(req,res)=>{
    
    pool.query(`SELECT o.id as id,p.name as nom,o.count as son, o.cost as narx,date_format(o.created_on,"%y-%m-%d %h:%i:%s") as vaqt FROM main_orders mo inner join orders  o on mo.id=o.main_order_id inner join 
    sklad p on p.id=o.product_id where 
    o.created_on> now() - interval  ${req.params.kun} day`, 
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

router.get("/boss_chiqim/:kun",(req,res)=>{
    
    pool.query(`SELECT  p.id as id,p.name as mahsulot, ap.count as qancha,p.cost*p.count as narx,date_format(ap.created_on, "%d-%m-%y %h:%m") as vaqt 
    FROM add_product ap inner join sklad p on ap.product_id=p.id inner join department d on ap.depart_id=d.id 
    where (p.created_on > now() - interval ${req.params.kun} day) `,
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
        
           
            res.status(200).json({code:200,success:{data:(rows.map(w=>w=w.narx)).reduce((a,b)=> a+b)}})
        
     })
})

router.get("/sklad_odam",(req,res)=>{
    pool.query(`SELECT d.id as id,d.name as bolim,r.name as rol, u.full_name as odam FROM share_product_sklad shs inner join users u on u.id=shs.to_id inner join 
    department d on d.id=shs.tdepart_id inner join users_roles ur on  ur.user_id=shs.to_id inner join roles r on r.id=ur.role_id where shs.fdepart_id=3 group by u.full_name`,
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
        
            
            res.status(200).json({code:200,success:{data:rows}})
        
     })
})

router.get("/bozor",(req,res)=>{
    pool.query(`select id,name,count,cost, date_format(created_on,'%d-%m-%Y, %h:%m:%s') created_on from sklad`,
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

//filtr
router.get("/filtr",(req,res)=>{
    console.log(req.query)
    pool.query(`SELECT id,name,isBaza FROM sklad where category_id=?;SELECT id,name,isBaza FROM product where category_id=?`,
    [req.query.category||1,req.query.category||1],
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
                    uz: "Bunday kategoriyali maxsulot hozirchaa yoq",
                    en: "No such product found",
                    ru: "Такого producta не найдено"
                }
            }
        })
        else{
            let arr=[]
            rows[0].forEach(e => {
                arr.push(e);
            });
            rows[1].forEach(e => {
                arr.push(e);
            });
            // console.log(arr)
            res.status(200).json({code:200,success:{data:arr}})
        }
     })
})

//get main orders

router.get("/main_orders",(req,res)=>{
    pool.query(`select m.id,sum(o.count*o.cost) summa,m.status,t.name table_name,
    u.full_name,date_format(m.created_on,'%d-%m-%Y, %h:%i:%s') created_on   from orders o 
    right join main_orders m on o.main_order_id=m.id
    right join users u on u.id=m.user_id
    left join \`table\` t on t.id=m.table_id
    where m.status=${(!req.query.status)?"'new'":"'done'"}
     group by m.id`, 
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

//ofitsantlarning foydasi
router.get("/ofitsiant/:day",(req,res)=>{
    
    pool.query(`select u.id,sum(o.count*o.cost) summa,u.full_name   from orders o 
    right join main_orders m on o.main_order_id=m.id
    left join users u on u.id=m.user_id
where  DATE(o.created_on)= DATE(now() - interval ${req.params.day||0} day)
     group by  DATE(u.id)`, 
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


//ofitsantlarning buyurtmalari soni
router.get("/ofitsiant_orders/:day",(req,res)=>{
    
    pool.query(`select u.id,count(m.id) count,u.full_name   from orders o 
    right join main_orders m on o.main_order_id=m.id
    left join users u on u.id=m.user_id
where  DATE(o.created_on)= DATE(now() - interval ${req.params.day||0} day)
     group by  DATE(u.id)`, 
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