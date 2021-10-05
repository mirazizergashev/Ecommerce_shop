const express = require("express");
const app = express();

const pool = require("../../database/db");
const { sendClickTrans } = require("../../botconnect")

app.post("/order", async (req, res) => {

    let fish = req.body.fish || null;
    let mfy = req.body.mfy || null;
    let tel = req.body.phone || null;
    let viloyat = req.body.viloyat || null;
    let tuman = req.body.tuman || null;
    console.log('llll')
    pool.promise().query(`insert into orders (user_id,amount,state,praduct_id ,isNaqd,fish,phone,viloyat,tuman,mfy,dostavka_id,curyer) 
        values (?,?,0,?,1,?,?,?,?,?,?,-1) ;
        SELECT max(id) as id FROM orders WHERE isNaqd=1 and amount=?`, [req.session.userId || null, req.body.amount, req.body.praduct_id, fish, tel, viloyat, tuman, mfy, req.body.dostavka_id,req.body.amount])
        .then((rest) => {
            sendClickTrans(rest[0][1][0].id,1)
            return res.status(200).json({
                code: 200,
                success: {
                    message: {
                        uz: "Muvvafaqiyatli buyurtma qilindi!",
                        en: "Muvvafaqiyatli buyurtma qilindi!",
                        ru: "Muvvafaqiyatli buyurtma qilindi!"
                    }
                }

            });
        }).catch((err) => {
            console.error("err", err)
            return res.status(200).json({
                code: 400,
                error: {
                    message: {
                        uz: "Xatolik!",
                        en: "Xatolik!",
                        ru: "Xatolik!"
                    }
                }

            });
        })

})


app.post("/naqd", async (req, res) => {
    if (req.body) {
        req.promokod = {
            Run: cost => 0
        }
        if (req.body.promokod) {
            //promokod
            console.log("promokod")
            const result = await pool.promise()
                .query("call promokod_checker(?)", [req.body.promokod])
                .then((rest) => {

                    console.log(rest[0])
                    if (rest[0][1][0].natija != 1) {
                        return {
                            error: {
                                message: {
                                    uz: "Promokod noto'g'ri kiritilgan!",
                                    en: "A new user has been created!",
                                    ru: "Создан новый пользователь!"
                                }
                            }
                        }

                    }
                    if (rest[0][0][0].isActive == 0 || rest[0][0][0].count * 1 <= 0) {
                        return {
                            error: {
                                message: {
                                    uz: "Eskirgan promokod!",
                                    en: "A new user has been created!",
                                    ru: "Создан новый пользователь!"
                                }
                            }
                        }

                    }
                    return rest[0][0][0]

                })
                .catch((err) => {
                    console.log(err)
                    return {
                        error: {
                            message: {
                                uz: "Promokodni tekshirishda xatolik!",
                                en: "A new user has been created!",
                                ru: "Создан новый пользователь!"
                            }
                        }
                    };
                })
            if (result.error) {
                console.log(result.error)
                return res.json({
                    error: 2,
                    error_note: result.error.message
                });
            }
            req.promokod = {
                id: result.id
            }
            //  console.log("result.amount)",result.amount,"||",result.isFoiz*1)
            req.promokod.Run = (cost = 0) => {
                if (result.isFoiz * 1)
                    return cost * 1 * (1 * result.amount) / 100;
                else
                    return 1 * result.amount;
            }

        }

        pool.query("select * from dostavka_type where id=?", req.body.dostavka_id, async (err, rslt) => {
            if (err) {
                console.error(err);
                return res.json({
                    error: 2,
                    error_note: "Not"
                });
            }
            // req.body.amount = req.body.amount * 1 + rslt[0].cost * 1
            // req.body.amount = Math.ceil(req.body.amount * 100) / 100
            req.Dostavka=(amount)=>Math.ceil((amount * 1 + rslt[0].cost * 1)*100)/100;

            let fish = req.body.fish || null;
            let mfy = req.body.mfy || null;
            let tel = req.body.phone || null;
            let viloyat = req.body.viloyat || null;
            let tuman = req.body.tuman || null;


            pool.promise().query(`insert into orders (user_id,state,sana,karta,fish,phone,viloyat,tuman,mfy,dostavka_id) 
    values (?,1 ,now(),?,?,?,?,?,?,?) ;`,
                    [req.session.userId||null, req.body.karta, fish, tel, viloyat, tuman, mfy, req.body.dostavka_id])
                .then((rest) => {
                    let {
                        data
                    } = JSON.parse(req.body.praduct_id), s = "", a = [], notFounds = [], lessProd = []
                    data.forEach((e, i) => {
                        s += "SELECT *,cost cost2 FROM product WHERE id=? and isActive=1;";
                        a.push(e.product_id)
                    });
                    s += "SELECT id,sub,percent,isFoiz FROM category WHERE isActive=1;";
                    pool.query(s, a, (err, rows) => {
                        if (err) {
                            console.error({
                                err
                            })
                            return res.json({
                                error: 2,
                                error_note: "Not"
                            });
                        }
                        data.forEach((e, i) => {
                            if (rows[i].length == 0) {
                                notFounds.push({
                                    id: e.product_id,
                                    name: e.name
                                })
                            } else {
                                if (rows[i][0].count * 1 < e.count) {
                                    lessProd.push({
                                        id: e.product_id,
                                        name: e.name,
                                        count: e.count
                                    })
                                } else {
                                    rows[i][0].cost = rows[i][0].cost * 1 * (100 - 1 * rows[i][0].discount) / 100
                                    rows[i][0].cost2 = rows[i][0].cost2 * 1 * (100 - 1 * rows[i][0].discount) / 100
                                    if (rows[i][0].cost < 0) rows[i][0].cost = 0
                                    changeCosts(rows[rows.length - 1], rows[i])

                                }
                            }
                        });
                        let check
                        if (notFounds.length > 0) check.notFounds = notFounds
                        if (lessProd.length > 0) check.lessProd = lessProd
                        if (check) {
                            return res.json({
                                error: 2,
                                error_note: "Not",
                                notes: check
                            });
                        }

                        let so = "INSERT INTO suborder(order_id,product_id,count,cost,discount,name,system_cost) VALUES",
                            aso = [],summa=0
                        data.forEach((e, i) => {
                            so += `(?,?,?,?,?,?,?),`
                            aso.push(rest[0].insertId, e.product_id, e.count, rows[i][0].cost,
                                req.promokod.Run(rows[i][0].cost), rows[i][0].name,
                                rows[i][0].cost * 1 - req.promokod.Run(rows[i][0].cost * 1) - rows[i][0].cost2 * 1)
                                summa+=rows[i][0].cost;
                        })
                        aso.push(req.Dostavka(summa-req.promokod.Run(summa)),
                        req.promokod.id||null,req.promokod.Run(summa),
                        
                        rest[0].insertId)
                        pool.query(so.slice(0, -1)+
                        "; UPDATE orders SET amount=?,promokod_id=?,discount=? WHERE id=?",aso,(err,row2)=>{
                            if (err) {
                                console.error({
                                    err
                                })
                                return res.json({
                                    error: 2,
                                    error_note: "Not"
                                });
                            }
                            //Order Yaratildi.....
                              sendClickTrans(rest[0].insertId,"<b>Naqd to'lov</b>\n")
                              res.status(200).json({
                                code: 200,
                                success: {
                                    message: {
                                        uz: "Buyurtma qabul qilindi! Tez orada mas'ullarimiz siz bilan bog'lanishadi!",
                                        en: "A new user has been created!",
                                        ru: "Создан новый пользователь!"
                                    }
                                }
                            })

                    })

                  
                })
                
            }).catch((err) => {
                    console.log(err)
                    res.json({
                        error: 2,
                        error_note: "Not"
                    });
                })

        })

    }



})


// click etab 2
app.use("/click/2", async (req, res) => {
    console.log("/click/2")
    const h = req.body
    console.log(h)
    if (h.action == '0' && h.error == '0') {
        pool.promise().query(`INSERT INTO click_order (service_id,click_paydoc_id,order_id,action,
            sign_time,error,error_note,sign_string,click_trans_id) VALUES 
            (?,?,?,?,?,?,?,?,?); SELECT max(id) as id FROM click_order 
            WHERE order_id=? `, [h.service_id, h.click_paydoc_id, h.merchant_trans_id, h.action,
        h.sign_time, h.error, h.error_note, h.sign_string, h.click_trans_id, h.merchant_trans_id])
            .then((rest) => {
                res.json({
                    merchant_trans_id: h.merchant_trans_id,
                    merchant_prepare_id: rest[0][1].id,
                    error: 0,
                    error_note: "Success"
                })
            }).catch((err) => {
                res.json({ error: 2, error_note: "Not" });
            })
    } else
        res.json({ error: 2, error_note: "Not" });
})

// click etab 3
app.use("/click/3", async (req, res) => {
    const h = req.body
    console.log('click3')
    if (h.action == '1' && h.error == '0') {
        const md5hash = md5(h.click_trans_id + h.service_id + SECRET_KEY + h.merchant_trans_id + h.merchant_prepare_id + h.amount + h.action + h.sign_time)
        if (md5hash == req.body.sign_string) {
            pool.promise().query(`UPDATE click_order SET action=1 WHERE id=? ;
             UPDATE orders SET click_state=1 ,state=2 WHERE id=?; `,
                [req.body.merchant_prepare_id, req.body.merchant_trans_id])
                .then((rest) => {
                    res.json({ error: 0, error_note: "Success" });
                }).catch((err) => {
                    res.json({ error: 1, error_note: "Not" });
                })
        }
        else
            res.json({ error: 1, error_note: "Not" });
    }
    else
        res.json({ error: 1, error_note: "Not" });
})


module.exports = app;