const express = require("express");
const router = express.Router();
const schema = require('../../models/order.js')
const pool = require('../../database/db');
const path = require("path")



router.get("/", (req, res) => {
    pool.query(`SELECT sp.id,u1.full_name from_name,d1.name from_depart,s.name,sp.count,s.measure,
    u2.full_name to_name,d2.name to_depart,date_format(sp.created_on,'%d-%m-%Y %h:%i:%s') created_on FROM share_product sp 
    inner join product s on s.id=sp.product_id
    inner join users u1 on u1.id=sp.from_id
    inner join users u2 on u2.id=sp.to_id
    inner join department d1 on d1.id=sp.fdepart_id
    inner join department d2 on d2.id=sp.tdepart_id;
    SELECT sp.id,u1.full_name from_name,d1.name from_depart,s.name,sp.count,s.measure,
    u2.full_name to_name,d2.name to_depart,date_format(sp.created_on,'%d-%m-%Y %h:%i:%s') created_on FROM share_product_sklad sp 
    inner join sklad s on s.id=sp.product_id
    inner join users u1 on u1.id=sp.from_id
    inner join users u2 on u2.id=sp.to_id
    inner join department d1 on d1.id=sp.fdepart_id
    inner join department d2 on d2.id=sp.tdepart_id;`,
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
            rows[1].forEach(e => {
                rows[0].push(e)
            });
            res.status(200).json({
                code: 200,
                success: {
                    data: rows[0]
                }
            })
        })
})

router.post('/cooking', (req, res) => {
    const userId = req.session.userId || 0
    pool.query(`SELECT p.name,sh.product_id,sum(sh.count) count,0 isSklad FROM share_product sh
    inner join product p on p.id=sh.product_id where sh.to_id=? group by sh.product_id;
    SELECT product_id,sum(count) count FROM share_product where from_id=? group by product_id;
    SELECT p.name,sh.product_id,sum(sh.count) count,1 isSklad FROM share_product_sklad sh
    inner join sklad p on p.id=sh.product_id where sh.to_id=? group by sh.product_id;
    SELECT product_id,sum(count) count FROM share_product_sklad where from_id=? group by product_id;
    SELECT * FROM retsep where product_id=?;
    `,
        [userId, userId, userId, userId, req.body.product_id || 0], (err, rows, fields) => {
            if (err) {
                console.log(err)
                return res.status(200).json({
                    code: 500,
                    error: {
                        message: "Serverda xatolik tufayli rad etildi !"
                    }
                })
            }

            for (let i = 0; i < rows[0].length; i++)
                for (let j = 0; j < rows[1].length; j++)
                    if (rows[0][i].product_id == rows[1][j].product_id) {
                        rows[0][i].count -= rows[1][j].count
                    }
            for (let i = 0; i < rows[2].length; i++)
                for (let j = 0; j < rows[3].length; j++)
                    if (rows[2][i].product_id == rows[3][j].product_id) {
                        rows[2][i].count -= rows[3][j].count
                    }
            let check = false;
            let result = rows[0].concat(rows[2])
if(rows[4].length==0){
    return  res.status(200).json({
        code: 400,
        error: {
            message: {
                uz: "Ushbu maxsulotning retsepti kiritilmagan!"
            }
        }
    })
}
            rows[4].forEach(e => {
                if (check) return 1
                let k = result.find(el => el.product_id == e.root_product_id && e.isSklad == el.isSklad)
                if (!k) {

                    return check = true;
                }
                if (k.count < e.count * req.body.count) {

                    check = true
                    return check;
                }
            })
            if (check) {
                return res.status(200).json({
                    code: 400,
                    error: {
                        message: {
                            uz: "Sizda buyurtmani bajarish uchun yetarli maxsulot yo'q"
                        }
                    }
                })
            }
            else {

                let s = '', s2 = '',
                    ss = 'INSERT INTO share_product(product_id,count,from_id,fdepart_id,to_id,tdepart_id) Values',
                    ss2 = 'INSERT INTO share_product_sklad(product_id,count,from_id,fdepart_id,to_id,tdepart_id) Values',
                    a = [], b = []
                rows[4].forEach((e, i) => {
                    if (e.isSklad == 0) {
                        s += `(?,?,${req.session.userId || -1},${req.session.departId},0,0),`
                        a.push(e.root_product_id, req.body.count * e.count)
                    }
                    else {
                        s2 += `(?,?,${req.session.userId || -1},${req.session.departId},0,0),`
                        b.push(e.root_product_id, req.body.count * e.count)
                    }
                })
                    if (s.length>0) s = ss + s.substr(0, s.length - 1) + ';'
                    if (s2.length>0) s = s + ss2 + s2.substr(0, s2.length - 1) + ';'
                    s += `call add_product_in(?,?,?);`
                    b.push(req.body.product_id, req.body.count, req.session.departId)
                    a = a.concat(b)
                  
                    pool.query(s, a, (err, rows, fields) => {
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
                        res.status(200).json({ code: 200, success: { message: { uz: "Muvaffaqiyatli qo'shildi!" } } })

                    })
                
                // res.status(200).json({ code: 200, success: { data: rows[0] } })
            }

        });
});

//asosiy maxsulotlar
router.post("/", (req, res) => {
    const checked = schema.share_product.validate(req.body);
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
    const { product_id, count, to_id, to_depart } = req.body
    pool.query("call share_productpro(?,?,?,?,?,?)",
        [product_id, count, to_id, to_depart, req.session.userId || 0, req.session.roleId],
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

                                uz: "Maxsulot almashish muvaffaqiyatli saqlandi!",
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
                                uz: "Bunday ID ga ega maxsulot aniqlanmadi",
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
                                uz: "Maxsulot beruvchi shaxs topilmadi!",
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
                                uz: "Maxsulot oluvchi shaxs topilmadi!",
                                en: "No table with such ID was identified",
                                ru: "Таблица с таким идентификатором не обнаружена"
                            }
                        }
                    })
                    break;
                case "6":
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Maxsulot yetarli emas",
                                en: "No table with such ID was identified",
                                ru: "Таблица с таким идентификатором не обнаружена"
                            }
                        }
                    })
                    break;

                case "7":
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "O'zingizga maxsulot bera olmaysiz",
                                en: "No table with such ID was identified",
                                ru: "Таблица с таким идентификатором не обнаружена"
                            }
                        }
                    })
                    break;
                default:
                    res.json({ error: "Kutilmagan xatolik" })

                    break
            }
        })
});


router.post("/sklad", (req, res) => {
    const checked = schema.share_product.validate(req.body);
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
    const { product_id, count, to_id, to_depart } = req.body
    pool.query("call share_productpro_sklad(?,?,?,?,?,?)",
        [product_id, count, to_id, to_depart, req.session.userId || 0, req.session.roleId],
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

                                uz: "Maxsulot almashish muvaffaqiyatli saqlandi!",
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
                                uz: "Bunday ID ga ega maxsulot aniqlanmadi",
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
                                uz: "Maxsulot beruvchi shaxs topilmadi!",
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
                                uz: "Maxsulot oluvchi shaxs topilmadi!",
                                en: "No table with such ID was identified",
                                ru: "Таблица с таким идентификатором не обнаружена"
                            }
                        }
                    })
                    break;
                case "6":
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Maxsulot yetarli emas",
                                en: "No table with such ID was identified",
                                ru: "Таблица с таким идентификатором не обнаружена"
                            }
                        }
                    })
                    break;

                case "7":
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "O'zingizga maxsulot bera olmaysiz",
                                en: "No table with such ID was identified",
                                ru: "Таблица с таким идентификатором не обнаружена"
                            }
                        }
                    })
                    break;
                default:
                    res.json({ error: "Kutilmagan xatolik" })

                    break
            }
        })
});

//ikkalasi

router.post("/both", (req, res) => {
    const checked = schema.share_product.validate(req.body);
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
    const { product_id, count, to_id, to_depart, isSklad } = req.body
    let query = (isSklad) ? "call share_productpro_sklad(?,?,?,?,?,?)" : "call share_productpro(?,?,?,?,?,?)"
    pool.query(query,
        [product_id, count, to_id, to_depart, req.session.userId || 0, req.session.roleId],
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

                                uz: "Maxsulot almashish muvaffaqiyatli saqlandi!",
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
                                uz: "Bunday ID ga ega maxsulot aniqlanmadi",
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
                                uz: "Maxsulot beruvchi shaxs topilmadi!",
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
                                uz: "Maxsulot oluvchi shaxs topilmadi!",
                                en: "No table with such ID was identified",
                                ru: "Таблица с таким идентификатором не обнаружена"
                            }
                        }
                    })
                    break;
                case "6":
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Maxsulot yetarli emas",
                                en: "No table with such ID was identified",
                                ru: "Таблица с таким идентификатором не обнаружена"
                            }
                        }
                    })
                    break;

                case "7":
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "O'zingizga maxsulot bera olmaysiz",
                                en: "No table with such ID was identified",
                                ru: "Таблица с таким идентификатором не обнаружена"
                            }
                        }
                    })
                    break;
                default:
                    res.json({ error: "Kutilmagan xatolik" })

                    break
            }
        })
});
//ortiqcha maxsulotni boshqa bo'limga berish
router.post("/surplus", (req, res) => {
    const checked = schema.share_product.validate(req.body);
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
    const { product_id, count, to_id, to_depart, isSklad } = req.body
    pool.query("call share_product_qaytarish(?,?,?,?,?,?,?)",
        [product_id, count, to_id, to_depart, req.session.userId || 0, req.session.roleId, isSklad || 0],
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

                                uz: "Maxsulot almashish muvaffaqiyatli saqlandi!",
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
                                uz: "Bunday ID ga ega maxsulot aniqlanmadi",
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
                                uz: "Maxsulot oluvchi shaxs topilmadi!",
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
                                uz: "Maxsulot beruvchi shaxs topilmadi!",
                                en: "No table with such ID was identified",
                                ru: "Таблица с таким идентификатором не обнаружена"
                            }
                        }
                    })
                    break;
                case "6":
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Maxsulot yetarli emas",
                                en: "No table with such ID was identified",
                                ru: "Таблица с таким идентификатором не обнаружена"
                            }
                        }
                    })
                    break;

                case "7":
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "O'zingizga maxsulot bera olmaysiz",
                                en: "No table with such ID was identified",
                                ru: "Таблица с таким идентификатором не обнаружена"
                            }
                        }
                    })
                    break;
                default:
                    res.json({ error: "Kutilmagan xatolik" })

                    break
            }
        })
});

router.post("/buy_product", (req, res) => {
    const checked = schema.buy_product.validate(req.body);
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
    const { product_id, count, cost } = req.body
    pool.query("call buy_productpro2(?,?,?)",
        [product_id, count, cost],
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
                                uz: "Maxsulot sotish muvaffaqiyatli saqlandi!",
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
                                uz: "Bunday ID ga ega maxsulot aniqlanmadi",
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
                                uz: "Maxsulot sotuvchi shaxs yoki bo'lim topilmadi!",
                                en: "The table is already busy!",
                                ru: "Стол уже занят!"
                            }
                        }
                    })
                    break;
                // case '5':
                //     res.status(200).json({
                //         code: 400,
                //         error: {
                //             message: {
                //                 uz: "Maxsulot beruvchi shaxs topilmadi!",
                //                 en: "No table with such ID was identified",
                //                 ru: "Таблица с таким идентификатором не обнаружена"
                //             }
                //         }
                //     })
                // break;
                case "6":
                    res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Maxsulot yetarli emas",
                                en: "No table with such ID was identified",
                                ru: "Таблица с таким идентификатором не обнаружена"
                            }
                        }
                    })
                    break;
                default:
                    res.json({ error: "Kutilmagan xatolik" })

                    break
            }
        })
});


module.exports = router;