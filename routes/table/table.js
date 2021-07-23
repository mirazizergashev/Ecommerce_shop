const express = require("express");
const router = express.Router();
const schema = require('../../models/product')
const Joi = require("joi");
const pool = require('../../database/db');



//Barcha band stollar
router.get("/new", (req, res) => {
    pool.query("SELECT m.table_id,t.name FROM main_orders m "+
    "inner join `table` t on t.id=m.table_id where status='new' and "+
    "created_on=(select max(created_on) from main_orders where id=m.id);", (err, rows, fields) => {
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

//Barcha band stollar
router.get("/done", (req, res) => {
    pool.query("select id,name from `table` where id not in (SELECT m.table_id FROM main_orders m "+
        "inner join `table` t on t.id=m.table_id where status='new' and "+
        "created_on=(select max(created_on) from main_orders where id=m.id));", (err, rows, fields) => {
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
router.get('/', (req, res) => {

   
    pool.query("SELECT 5*5",
     [req.params.rol||0], (err, rows, fields) => {
        if (err){
            console.log(err)
            return res.status(200).json({
                code:500,
                error: {
                    message: "Serverda xatolik tufayli rad etildi !"
                }
            })
        }
        req.session.role_id=req.params.rol
        res.status(200).json({ code:200, success: { data: rows } })
        
    });
});

//barcha pagelarni olish
router.get('/all', (req, res) => {
    pool.query("SELECT * FROM `table` ",(err, rows, fields) => {
        if (err)
        return res.status(200).json({
            code:500,
            error: {
                message: "Serverda xatolik tufayli rad etildi !"
            }
        })

        
        res.status(200).json({ code:200, success: { data: rows } })
    });
});

//page qoshish.
router.post("/add", async (req, res) => {

    //validatsiyada xatolik
    const checked = schema.stol.validate(req.body);
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
    pool.query("call table_insert(?,?)", [a.id,a.nom], (err, rows, fields) => {
      
        if (err){
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
                return res.status(200).json({
                    code: 201,
                    error: {
                        message: {
                            uz: "Yangi stol yaratildi !",
                            en: "New table created!",
                            ru: "Создан новый стол!"
                        }
                    }
                })

                case '2':
                    return res.status(200).json({
                        code: 200,
                        error: {
                            message: {
                                uz: "Stol nomi o'zgartirildi!",
                                en: "The table name has changed!",
                                ru: "Cтол имя изменился!"
                            }
                        }
                    })


                    case '3':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Bunday nomli stol mavjud!",
                                en: "There is a table with such a name!",
                                ru: "Есть таблица с таким названием!"
                            }
                        }
                    })

                    
           
            default:
                return res.status(200).json({
                    code: 400,
                    error: {
                        message: {
                            uz: "Stol yaratishda xatolik",
                            en: "Error creating table",
                            ru: "Ошибка при создании таблицы"
                        }
                    }
                })
             break;
        }


    })


});






module.exports = router;