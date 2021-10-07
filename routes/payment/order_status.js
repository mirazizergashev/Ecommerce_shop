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
        values (?,?,0,?,1,?,?,?,?,?,?,0) ;
        SELECT max(id) as id FROM orders WHERE isNaqd=1 and amount=?`, [req.session.userId || null, req.body.amount, req.body.praduct_id, fish, tel, viloyat, tuman, mfy, req.body.dostavka_id||1,req.body.amount])
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


module.exports = app;