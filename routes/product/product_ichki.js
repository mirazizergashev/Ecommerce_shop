const express = require("express");
const router = express.Router();
const schema = require('../../models/product')
const Joi = require("joi");
const pool = require('../../database/db');



//filtr
router.get("/filtr",(req,res)=>{
    console.log(req.query)
    let sozz=``;
    if(req.query.category==0){
        sozz=`SELECT id,name,isForSale FROM product`
    }
    else{
        sozz=`SELECT id,name,isForSale FROM product where category_id=?`
    }
    pool.query(sozz,
    [req.query.category||0],
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
        else
        res.status(200).json({code:200,success:{data:rows}})
     })
})

router.get("/all/:id",(req,res)=>{
    pool.query(`select p.id,p.name,p.description,p.count, 
    p.measure,c.name category,p.cost,date_format(p.created_on,'%d-%m-%Y, %h:%i:%s') created_on from product p
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


//shu kunlik ovqatlar faqat queryga til
router.get("/",(req,res)=>{
    pool.query(`select * from product_head pc inner join product_head_data pd on pc.isForSale=1 and 
    pc.count>0 and pd.product_id=pc.id and pd.language=? and    
    (pc.isDaily=0 or (pc.isDaily=1 and DATE_FORMAT(pc.created_on, "%d-%m-%Y")=DATE_FORMAT(now(), "%d-%m-%Y") )) 
    inner join category_names cn on cn.category_id=pc.category_id and cn.language=? `,
    [req.query.language||"uz",req.query.language||"uz"],
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



router.get("/myproduct",(req,res)=>{
    pool.query(`SELECT * FROM shafran.product where users_roles_id=?;`,[req.session.userId],
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
                    uz: "Siz yaratgan maxsulot hali yo'q",
                    en: "No such product found",
                    ru: "Такого producta не найдено"
                }
            }
        })
        else
        res.status(200).json({code:200,success:{data:rows}})
     })
})


//page qoshish.
router.post("/add", async (req, res) => {

    //validatsiyada xatolik
    const checked = schema.product_ichki.validate(req.body);
    if (checked.error) {        
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
    pool.query("call product(?,?,?,?,?,?,?,?)", [a.id,a.measure,a.isForSale,a.kategorya,a.nom,a.izoh||'bosh',a.kunlik,a.masul], (err, rows, fields) => {
      
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

//salom







module.exports = router;