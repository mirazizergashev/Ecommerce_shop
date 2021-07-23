const express = require("express");
const router = express.Router();
const schema = require('../../models/order.js')
const pool = require('../../database/db');
const path = require("path")


router.get("/retsept/:id",(req,res)=>{
    pool.query(`SELECT r.id,r.root_product_id,r.count product_count,ph.* FROM retsep r 
    inner join product_head ph 
    on ph.id=r.root_product_id and r.product_id=?`, 
    [req.params.id],
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



router.post("/",  (req, res) => {
    const checked = schema.order.validate(req.body);
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
    const {product_id, count,  main_order_id,isSklad}=req.body
    pool.query("call order3_insert(?,?,?,?)", 
    [product_id, count,  main_order_id,isSklad],
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
                                order_id: rows[0][0].id,
                                uz: "Buyurtma muvaffaqiyatli saqlandi!",
                                en: "",
                                ru: ""
                            }
                        }
                    })
                    break;

                case '5':
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Maxsulot yetarli emas!",
                                en: "",
                                ru: ""
                            }
                        }
                    })
                    break;
                    case '4':
                        res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Ushbu asosiy buyurtma allaqachon yopilgan.",
                                    en: "",
                                    ru: ""
                                }
                            }
                        })
                        break;
                        case '3':
                            res.status(200).json({
                                code: 400,
                                error: {
                                    message: {
                                        uz: "Bunday ID ga ega maxsulot topilmadi",
                                        en: "The table is already busy!",
                                        ru: "Стол уже занят!"
                                    }
                                }
                            })
                            break;
                            default:
                                res.status(200).json({
                                    code: 400,
                                    error: {
                                        message: {
                                            uz: "Kutilmagan xatolik",
                                            en: "The table is already busy!",
                                            ru: "Стол уже занят!"
                                        }
                                    }
                                })
                            break
            }
        })
});

router.post('/checked',(req,res)=>{
    pool.query("call order_check(?,?)", 
    [req.body.order_id, req.session.userId],
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
                                status: rows[0][0].status,
                                uz: "Buyurtma muvaffaqiyatli saqlandi!",
                                en: "",
                                ru: ""
                            }
                        }
                    })
                    break;
                    case '4':
                        res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Sizda buyurtmani qabul qilish huquqi yo'q!",
                                    en: "",
                                    ru: ""
                                }
                            }
                        })
                        break;
                        case '6':
                            res.status(200).json({
                                code: 400,
                                error: {
                                    message: {
                                        uz: "Order topilmadi!",
                                        en: "",
                                        ru: ""
                                    }
                                }
                            })
                            break;
                            default:
                                res.status(200).json({
                                    code: 400,
                                    error: {
                                        message: {
                                            uz: "Kutilmagan xatolik",
                                            en: "The table is already busy!",
                                            ru: "Стол уже занят!"
                                        }
                                    }
                                })
                            break
                }
            })
})
module.exports = router;