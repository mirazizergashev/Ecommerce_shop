const express = require("express");
const app = express();

const md5 = require("md5");
const pool = require("../../database/db");

const card_type = "uzcard";
const merchant_id =13858
const merchant_user_id=21871
const service_id = 19323 
const return_url="http://miraziz.tk:3003"
const SECRET_KEY= 'ctcYM1seJm3'

//  ejs render 
app.get("/money", async (req, res) => {
    await pool.promise().query("SELECT nomi,id FROM product; ").then((rest) => {
        return res.status(200).json({
            code: 200,
            success: {
                message: {
                    uz: rest[0],
                    en: rest[0],
                    ru: rest[0]
                }
            }

        });
        // res.render("click",{msg:"To'lov qilish !.",data:rest.recordset})
    }).catch((err) => {
        return res.status(200).json({
            code: 404,
            success: {
                message: {
                    uz: "Xatolik",
                    en: err,
                    ru: err
                }
            }

        });
    })
})


// click etab 1
app.get("/click", async(req, res) => {

    req.body = req.query

    pool.promise().query(`insert into orders (user_id , amount , payme_state , phone,sana ,praduct_id ) 
    values (?,?,0,0 ,now() , ?) ; 
    SELECT max(id) as id FROM orders WHERE user_id=?`,[9,req.body.amount,req.body.praduct_id,9])
    .then((rest) => {
         res.redirect(`https://my.click.uz/services/pay?transaction_param=${rest[0][1].id}&
         amount=${req.query.amount}&card_type=${card_type}&merchant_id=${merchant_id}
         &merchant_user_id=${merchant_user_id}&
         service_id=${service_id}&return_url=${return_url}`)
    }).catch((err) => {
         res.json({ error: 2, error_note: "Not" });
    })
})

// click etab 2
app.use("/click/2", async(req, res) => {
    const h =req.body 
    console.log(h)
    if (h.action == '0' && h.error == '0') {
        pool.promise().query(`INSERT INTO click_order (service_id,click_paydoc_id,order_id,action,
            sign_time,error,error_note,sign_string,click_trans_id) VALUES 
            (?,?,?,?,?,?,?,?,?); SELECT max(id) as id FROM click_order 
            WHERE order_id=? `,[h.service_id,h.click_paydoc_id,h.merchant_trans_id,h.action,
                h.sign_time, h.error,h.error_note,h.sign_string,h.click_trans_id,h.merchant_trans_id])
                .then((rest) => {
            res.json({ 
                merchant_trans_id: h.merchant_trans_id, 
                merchant_prepare_id:rest[0][1].id,
                error: 0,
                error_note: "Success" })
        }).catch((err) => {
             res.json({ error: 2, error_note: "Not" });
        })
    } else
        res.json({ error: 2, error_note: "Not" });
})

// click etab 3
app.use("/click/3", async(req, res) => {
    const h =req.body 
    console.log(h)
    if (h.action == '1' && h.error == '0') {
       const md5hash = md5(h.click_trans_id+h.service_id+SECRET_KEY+h.merchant_trans_id+h.merchant_prepare_id+h.amount+h.action+h.sign_time)
        if(md5hash==req.body.sign_string){
            pool.promise().query(`UPDATE click_order SET action=1 WHERE id=? ;
             UPDATE orders SET click_state=1 ,state=2 WHERE id=?; `,
             [req.body.merchant_prepare_id,req.body.merchant_trans_id])
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