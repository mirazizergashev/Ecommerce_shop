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


        pool.promise().query(`insert into orders (user_id , amount ,state ,praduct_id ,isNaqd,curyer) 
    values (?,?,2,?,1,?) ; 
    SELECT max(id) as id FROM orders WHERE isNaqd=1 and curyer=?`, [req.body.userId, req.body.amount, req.body.praduct_id, req.session.userId, req.session.userId])
            .then((rest) => {
                // console.log(rest[0][1][0].id)
                // sendClickTrans(rest[0][1][0].id,1)
                return res.status(200).json({
                    code: 200,
                    success: {
                        message: {
                            uz: "Muvvafaqiyatli tolov qilindi!",
                            en: "Muvvafaqiyatli tolov qilindi!",
                            ru: "Muvvafaqiyatli tolov qilindi!"
                        }
                    }

                });
            }).catch((err) => {
                console.log(err)
                return res.status(200).json({
                    code: 400,
                    error: {
                        message: {
                            uz: "Tolov qilishda xatolik!",
                            en: "Tolov qilishda xatolik!",
                            ru: "Tolov qilishda xatolik!"
                        }
                    }

                });
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