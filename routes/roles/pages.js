const express = require("express");
const router = express.Router();
const schema = require('../../models/roles')
const Joi = require("joi");
const pool = require('../../database/db');


//page olish user asosida rol tanlaganda avtomatik bodyga rolni qoshib yuboradi
router.get('/:rol', (req, res) => {

    //rol tanlasa avtomatik pagelarga murojaat boladi demak sessionga rol yuborilganda shuni sessionga olamiz
   
    pool.query("SELECT * FROM "+
    "pages where active=1 and id in(select page_id from roles_pages where role_id=? and active=1)",
     [req.params.rol||0], (err, rows, fields) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                error: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        ru: "Отклонено из-за ошибки сервера!",
                        en: "Rejected due to server error!"
                    }
                }
            })
        }
        // bu shunchaki get
        
        req.session.role_id=req.params.rol
        res.status(200).json({ success: { data: rows[0] } })
        
    });
});

//barcha pagelarni olish
router.get('/all/all', (req, res) => {
    pool.query(` SELECT id,name,url_basic,DATE_FORMAT(addtime, "%d-%m-%Y, %h:%m:%s") created_on FROM pages`,(err, rows, fields) => {
        console.log(rows)
        if (err)
            return res.status(500).json({
                error: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        ru: "Отклонено из-за ошибки сервера!",
                        en: "Rejected due to server error!"
                    }
                }
            })

        // bu shunchaki get
       
        // req.session.role_id=req.params.rol
        res.status(200).json({ success: { data: rows } })
    });
});

//page qoshish
router.post("/add_page", async (req, res) => {

    //validatsiyada xatolik
    const checked = schema.page.validate(req.body);
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
    pool.query("call page_edit_insert(?,?,?,?,?)", [a.id,a.name,a.url,a.icon, a.hol], (err, rows, fields) => {
       
        if (err)
        return res.status(500).json({
            error: {
                message: {
                    uz: "Serverda xatolik tufayli rad etildi !",
                    ru: "Отклонено из-за ошибки сервера!",
                    en: "Rejected due to server error!"
                }
            }
        })
        console.log(rows[0][0])
        switch (rows[0][0].natija) {
            case '1':
                 res.status(201).json({
                    success: {
                        message: {
                            uz: "Sahifa yaratildi !",
                            ru: "Страница создана!",
                            en: "Page created!"
                        }
                    }
                })
            break;
            case '2':
                 res.status(200).json({
                    success: {
                        message: {
                            uz: "Sahifa o'zgartirildi !",
                            ru: "Страница изменилась!",
                            en: "Page changed!"
                        }
                    }
                })
            break;
            case '3':
                 res.status(403).json({
                    error: {
                        message: {
                            uz: "Bu sahifa topilmadi !",
                            ru: "Эта страница не может быть найдена!",
                            en: "This page could not be found!"
                        }
                    }
                })
            break;


            
            case '4':
                 res.status(400).json({
                    error: {
                        message: {
                            uz: "Bunday url mavjud !",
                            ru: "Есть такой url!",
                            en: "There is such a url!"
                        }
                    }
                })
            break; 
           
            default:
                res.status(404).json({
                    error: {
                        message: {
                            uz: "Kutilmagan holat yoki server xatosi !",
                            ru: "Неожиданная ситуация или ошибка сервера!",
                            en: "Unexpected situation or server error!"
                        }
                    }
                })
                break;
        }


    })


});





module.exports = router;