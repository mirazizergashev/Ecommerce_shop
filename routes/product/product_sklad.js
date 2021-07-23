const express = require("express");
const router = express.Router();
const schema = require('../../models/product')
const Joi = require("joi");
const pool = require('../../database/db');



router.get("/all/:id",(req,res)=>{
    pool.query(`select p.id,p.name,p.description,p.count, 
    p.measure,c.name category,p.cost,date_format(p.created_on,'%d-%m-%Y, %h:%m:%s') created_on from sklad p
    inner join categories c on c.id=p.category_id`,
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

router.get("/bozor",(req,res)=>{
    pool.query(`select p.id,p.name,p.description,p.count, 
    p.measure,c.name category,p.cost,date_format(p.created_on,'%d-%m-%Y, %h:%m:%s') created_on from sklad p
    inner join categories c on c.id=p.category_id`,
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

//filtr Bobir uchun
router.get("/filtr/:id",(req,res)=>{
    let kateg=req.params.id
    if(req.params.id==0){
        kateg='pc.category_id'
    }
    pool.query(`select pc.name as nom,pc.id,pc.description,pc.count,pc.cost,pc.measure from product pc inner join categories cn on cn.id=pc.category_id where 
    pc.isForSale=1 and pc.count>0 and    
    (pc.isDaily=0 or (pc.isDaily=1 and pc.created_on> now() - interval 2 day))  and pc.category_id= ${kateg}`,

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
            
            res.status(200).json({code:200,success:{data:rows}})
        }
     })
})


//filtr Bobir uchun
router.get("/babvir",(req,res)=>{
    
    pool.query(`SELECT p.name,p.description,p.count,p.measure FROM product p 
    inner join users_roles ur on p.users_roles_id=ur.id 
    inner join roles r on r.id=ur.role_id inner join department d on d.id=r.depart_id
    where ur.id=${req.params.urId}`,

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
            
            res.status(200).json({code:200,success:{data:rows}})
        }
     })
})

//filtr Bobir uchun
router.get("/babir",(req,res)=>{
    console.log(req.session)
    pool.query(`SELECT * FROM  users_roles ur 
    inner join roles r on r.id=ur.role_id inner join department d on d.id=r.depart_id where d.id=3 and ur.id=${req.session.urId}`,

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
        if(rows.length==0){
            pool.query(`SELECT p.id,p.isBaza,p.isForSale,p.name,p.description,p.count,p.measure FROM product p 
            inner join users_roles ur on p.users_roles_id=ur.id 
            inner join roles r on r.id=ur.role_id inner join department d on d.id=r.depart_id
            where ur.id=${req.session.urId}`,
        
             (err2, rows2, fields22) => {
                if (err2) {
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
                if(rows2.length==0)
                return res.status(200).json({
                    code: 400,
                    error: {
                        message: {
                            uz: "Bunday kategoriyali22 maxsulot hozirchaa yoq",
                            en: "No such product found",
                            ru: "Такого producta не найдено"
                        }
                    }
                })
                else{
                    
                    res.status(200).json({code:200,success:{data:rows2}})
                }
             })
        }
        
        else{
            
            pool.query(`SELECT p.id,p.isBaza,p.name,p.description,p.count,p.measure FROM sklad p 
            inner join users_roles ur on p.users_roles_id=ur.id 
            inner join roles r on r.id=ur.role_id inner join department d on d.id=r.depart_id
           `,
        
             (err3, rows3,fields) => {
                if (err3) {
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
                if(rows3.length==0)
                return res.status(200).json({
                    code: 400,
                    error: {
                        message: {
                            uz: "Bunday kategoriyali333 maxsulot hozirchaa yoq",
                            en: "No such product found",
                            ru: "Такого producta не найдено"
                        }
                    }
                })
                else{
                    
                    res.status(200).json({code:200,success:{data:rows3}})
                }
             })
        }
     })
})


//filtr Shaxzod uchun
router.get("/filtr2/:id",(req,res)=>{
    let kateg=req.params.id
    if(req.params.id==0){
        kateg='category_id'
    }
    pool.query(`SELECT * FROM product where category_id=${kateg};
    SELECT * FROM sklad where category_id=${kateg}`,

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
            
            res.status(200).json({code:200,success:{data:rows[0].concat(rows[1])}})
        }
     })
})

//skladga nom bilan qoshish.
router.post("/add_new", async (req, res) => {

    //validatsiyada xatolik
    const checked = schema.product.validate(req.body);
    if (checked.error) {
        console.log(checked.error)        
        console.log(checked)        
        const msg=checked.error.details[0].message.split("#")
        return res.status(200).json({
            code:400,
            error: {
                message: {
                    uz:msg[0],
                    en:msg[1],
                    ru:msg[2]
                }
            }

        });
    }

    
    let a = req.body;
    console.log(a)
    pool.query("call sklad(?,?,?,?,?,?)", [a.id,a.measure,a.nom,a.izoh||"salom",a.kategorya,req.session.urId||0], (err, rows, fields) => {
      
        if (err){
            console.log(err)
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
            case '0':
                return res.status(200).json({
                    code: 400,
                    error: {
                        message: {
                            uz: "Bunday maxsulot topilmadi !",
                            en: "No such product found!",
                            ru: "Такого товара не найдено!"
                        }
                    }
                })
           
           
            default:
                return res.status(200).json({
                    code: 200,
                    success: {
                        message: {
                            uz: "Yangi maxsulot yaratildi",
                            en: "No such product found!",
                            ru: "Такого товара не найдено!"
                        }
                    }
                })
            break;
        }


    })


});


//skladga qoshilganini ustiga nom va narxlani qoshib yozib ketish uchun
router.post("/add_product", async (req, res) => {

    //validatsiyada xatolik
    const checked = schema.add_product.validate(req.body);
    if (checked.error) {
        console.log(checked.error)        
        console.log(checked)        
        const msg=checked.error.details[0].message.split("#")
        return res.status(200).json({
            code:400,
            error: {
                message: {
                    uz:msg[0],
                    en:msg[1],
                    ru:msg[2]
                }
            }

        });
    }

    
    let a = req.body;
    console.log(a)
    pool.query("call add_product(?,?,?,?,?)", [a.id,a.son,a.narx,a.sklad,req.session.departId||0], (err, rows, fields) => {
      
        if (err){
            console.log(err)
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
            case '0':
                return res.status(200).json({
                    code: 400,
                    error: {
                        message: {
                            uz: "Bunday maxsulot topilmadi !",
                            en: "No such product found!",
                            ru: "Такого товара не найдено!"
                        }
                    }
                })
                case '7':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Siz rol tanlamagansiz !",
                                en: "No such product found!",
                                ru: "Такого товара не найдено!"
                            }
                        }
                    })
               
           
            default:
                return res.status(200).json({
                    code: 200,
                    success: {
                        message: {
                            uz: "Maxsulot qiymati ozgardi",
                            en: "No such product found!",
                            ru: "Такого товара не найдено!"
                        }
                    }
                })
            break;
        }


    })


});







module.exports = router;