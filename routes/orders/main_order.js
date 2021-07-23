const express = require("express");
const router = express.Router();
const schema = require('../../models/order.js')
const pool = require('../../database/db');
const path = require("path")



router.get("/my_busy",(req,res)=>{
    pool.query("select mo.*,t.name table_name,u.full_name from main_orders mo "+
    "inner join `table` t on t.id=mo.table_id and mo.status='new'"+
    "inner join users u on mo.user_id=u.id and u.id=?;", [req.session.userId],
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

router.get("/freetables",(req,res)=>{
    pool.query("select * from `table` t where id not in("+
        "select table_id from main_orders where status='new' )", 
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


router.get("/my_main_orders",(req,res)=>{
    pool.query("select * from `table` t where id not in("+
        "select table_id from main_orders where status='new' )", 
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

router.get("/all",(req,res)=>{
    pool.query('select mo.*,t.name table_name,u.full_name from main_orders mo '+
    'inner join `table` t on t.id=mo.table_id '+
    "inner join users u on mo.user_id=u.id", 
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

router.get("/busy",(req,res)=>{
    pool.query('select mo.*,t.name table_name,u.full_name from main_orders mo '+
    'inner join `table` t on t.id=mo.table_id and mo.status="new" '+
    "inner join users u on mo.user_id=u.id", 
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

router.get("/done",(req,res)=>{
    pool.query(`select m.*,sum(o.count*o.cost) summa,u.full_name  from orders o 
    inner join main_orders m on o.main_order_id=m.id
    left join users u on u.id=m.user_id
     group by o.main_order_id `,
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

router.get("/orders/:id",(req,res)=>{
    pool.query(`select p.name,p.description,p.measure,o.count*o.cost xarajat,o.* from orders o 
    inner join product p on p.id= o.product_id and o.main_order_id=?;
    select p.name,p.description,p.measure,o.count*o.cost xarajat,o.* from orders o 
    inner join sklad p on p.id= o.product_id and o.main_order_id=?;`,[req.params.id,req.params.id],
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
                        data: rows[0].concat(rows[1])
                }
            })
        })
})


router.post("/",  (req, res) => {
    // console.log(req.body,req.session.userId||0,req.session.roleId)
    const checked = schema.mainorder.validate(req.body);
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
    const {table_id}=req.body
    pool.query("call main_order_insert(?,?)",
     [table_id,req.session.userId||0],
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
                                main_order_id:rows[0][0].id,
                                uz: "Stol muvaffaqiyatli bron qilindi!",
                                en: "The table was successfully occupied!",
                                ru: "Стол был успешно занят!"
                            }
                        }
                    })
                    break;

                case '3':
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Sizga ofitsiant roli berilmagan.",
                                en: "A waiter with such an ID was not identified",
                                ru: "Официант с таким идентификатором не идентифицирован"
                            }
                        }
                    })
                    break;
                    case '4':
                        res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Mavjud bo'lmagan stolni yubordingiz!",
                                    en: "The table is already busy!",
                                    ru: "Стол уже занят!"
                                }
                            }
                        })
                        break;
                case '5':
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Bu stol bron qilingan va to'lov qabul qilinmagan!",
                                en: "No table with such ID was identified",
                                ru: "Таблица с таким идентификатором не обнаружена"
                            }
                        }
                    })
                    break;
             default:
                                res.json({error:"Kutilmagan xatolik"})
    
                            break
            }
        })
});

router.get("/:id",  (req, res) => {

    pool.query("call main_order_done(?)",
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
          
            switch (rows[0][0].natija) {
                case '1':
                    res.status(200).json({
                        code: 201,
                        success: {
                            message: {
                                main_order_id:rows[0][0].id,
                                uz: "To'lov muvaffaqiyatli qabul qilindi",
                                en: "The table was successfully occupied!",
                                ru: "Стол был успешно занят!"
                            }
                        }
                    })
                    break;

                case '3':
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Bunday ID ga ega ochiq holatdagi buyurtma mavjud emas!",
                                en: "A waiter with such an ID was not identified",
                                ru: "Официант с таким идентификатором не идентифицирован"
                            }
                        }
                    })
                    break;
                 default:
                                res.json({error:"Kutilmagan xatolik"})
    
                            break
            }
        })
});

router.get("/checkPayment/:id",(req,res)=>{
    pool.query(`select m.*,sum(o.count*o.cost) summa,u.full_name  from orders o 
    right join main_orders m on o.main_order_id=m.id
    left join users u on u.id=m.user_id
    where m.id=?
     group by o.main_order_id `,[req.params.id],
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