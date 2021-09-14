const express = require("express");
const app = express();
const { poolPromise } = require("../../db/dbConnect")
check = require("../../middleware/auth").authCheck

const md5 = require("md5")

const card_type = "uzcard";
const merchant_id =12438
const merchant_user_id=18609
const service_id = 17164 
const return_url="http://itleader.uz:3000"
const SECRET_KEY= 'h0C9CH5wdW' 

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
app.get("/click", [check], async(req, res) => {
    const pool = await poolPromise
    const request = await pool.request();
    req.body = req.query
    request.input("user_id", req.userId)
    request.input("amount", req.body.amount)
    request.input("praduct_id",req.body.praduct_id)
    request.query("insert into orders (user_id , amount , click_state , phone,sana ,praduct_id ) values (@user_id,@amount,0,0 ,GETDATE() , @praduct_id) ; SELECT max(id) as id FROM orders WHERE user_id=@user_id ").then((rest) => {
         res.redirect(`https://my.click.uz/services/pay?transaction_param=${rest.recordset[0].id}&amount=${req.query.amount}&card_type=${card_type}&merchant_id=${merchant_id}&merchant_user_id=${merchant_user_id}&service_id=${service_id}&return_url=${return_url}`)
    }).catch((err) => {
         res.json({ error: 2, error_note: "Not" });
    })
})

// click etab 2
app.use("/click/2", async(req, res) => {
    const h =req.body 
    console.log(h)
    if (h.action == '0' && h.error == '0') {
        const pool = await poolPromise
        const request = await pool.request();
        request.input("service_id", h.service_id)
        request.input("click_paydoc_id",h.click_paydoc_id)
        request.input("order_id", h.merchant_trans_id)
        request.input("action",h.action)
        request.input("sign_time", h.sign_time)
        request.input("error", h.error)
        request.input("error_note", h.error_note)
        request.input("sign_string", h.sign_string)
        request.input("click_trans_id", h.click_trans_id)
        request.query("INSERT INTO click_order (service_id,click_paydoc_id,order_id,action,sign_time,error,error_note,sign_string,click_trans_id) VALUES (@service_id,@click_paydoc_id,@order_id,@action,@sign_time,@error,@error_note,@sign_string,@click_trans_id); SELECT max(id) as id FROM click_order WHERE order_id=@order_id ").then((rest) => {
            res.json({ 
                merchant_trans_id: h.merchant_trans_id, 
                merchant_prepare_id:rest.recordset[0].id,
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
        const pool = await poolPromise
        const request = await pool.request();
        const md5hash = md5(h.click_trans_id+h.service_id+SECRET_KEY+h.merchant_trans_id+h.merchant_prepare_id+h.amount+h.action+h.sign_time)
        if(md5hash==req.body.sign_string){
            request.input("click_order_id", req.body.merchant_prepare_id)
            request.input("order_id", req.body.merchant_trans_id)
            request.query(`UPDATE click_order SET action=1 WHERE id=@click_order_id ; UPDATE orders SET click_state=1 ,state=2 WHERE id=@order_id ; `)
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