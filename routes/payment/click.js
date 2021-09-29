const express = require("express");
const app = express();

const md5 = require("md5");
const pool = require("../../database/db");

const card_type = "uzcard";
const merchant_id =13858
const merchant_user_id=21871
const service_id = 19323 
const return_url="http://buy-it.uz"
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
if(req.body){
    console.log(req.session.userId) 
    let sn="",sv="",disc
    if (req.body.promokod) {
        //promokod
       
       const result=await pool.promise()
            .query("call promokod_checker(?)", [req.body.promokod])
            .then((rest) => {
                
                if (rest[1][0].natija != 1) {
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
                if (rest[0][0].isActive == 0 || rest[0][0].count*1 <= 0) {
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
                return {
                    data: rows[0][0]
                }
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
            if(result.error){
               return res.json({ error: 2, error_note:result.error.message  });
            }
             sn=`,promokod_id,discount`
            if(result.isFoiz){
                disc=req.body.amount*1*(100-1*result.amount)
            }else{
                disc=req.body.amount*-1*result.amount
            }
            req.body.amount=req.body.amount*1-disc
            sv=`,${result.id},${disc}`

    }
    if(req.session.userId){

    pool.promise().query(`insert into orders (user_id , amount , payme_state ,sana ,praduct_id ,isClick,karta,dostavka_id) 
    values (?,?,0,0 ,now() , ?,1,?,?) ; 
    SELECT max(id) as id FROM orders WHERE user_id=?`,
    [req.session.userId,req.body.amount,req.body.praduct_id,req.body.karta,req.body.dostavka_id,req.session.userId])
    .then((rest) => {
        pool.promise().query("call ecommerce_shop.promokod_use(?, -1);",rest[0][1][0].id)
    .then(e=>{})
    .catch(err=>console.log({error:"promokod change",err}))
res.redirect(`/click-ghvcjhhtrfhhkjdfhkjdfn/service/transaction_param=${rest[0][1][0].id}&`+
         `amount=${req.body.amount}&card_type=${req.body.karta}&merchant_id=${merchant_id}`+
         `&merchant_user_id=${merchant_user_id}&`+
         `service_id=${service_id}&return_url=${return_url}`)
    }).catch((err) => {
        console.log(err)
         res.json({ error: 2, error_note: "Not" });
    })
}
else{
    let fish=req.body.fish||"fish";
    let mfy=req.body.mfy||"mfy";
    let tel=req.body.phone||"phone";
    let viloyat=req.body.viloyat||"viloyat";
    let tuman=req.body.tuman||"tuman";
    pool.promise().query(`insert into orders (amount,payme_state,state,sana ,praduct_id ,isClick,karta,fish,phone,viloyat,tuman,mfy,dostavka_id) 
    values (?,0,0 ,now(),?,1,?,?,?,?,?,?,?) ; 
    SELECT max(id) as id FROM orders WHERE phone=?`,
    [req.body.amount,req.body.praduct_id,req.body.karta,fish,tel,viloyat,tuman,mfy,req.body.dostavka_id,tel])
    .then((rest) => {
         res.redirect(`/click-ghvcjhhtrfhhkjdfhkjdfn/service/transaction_param=${rest[0][1][0].id}&`+
         `amount=${req.body.amount}&card_type=${req.body.karta}&merchant_id=${merchant_id}`+
         `&merchant_user_id=${merchant_user_id}&`+
         `service_id=${service_id}&return_url=${return_url}`)
    }).catch((err) => {
        console.log(err)
         res.json({ error: 2, error_note: "Not" });
    })
}

}
})

// click etab 2
app.use("/click/2", async(req, res) => {
    const h =req.body 
    if (h.action == '0' && h.error == '0') {
        pool.promise().query(`INSERT INTO click_order (service_id,click_paydoc_id,order_id,action,
            sign_time,error,error_note,sign_string,click_trans_id) VALUES 
            (?,?,?,?,?,?,?,?,?); SELECT max(id) as id FROM click_order 
            WHERE order_id=? `,[h.service_id,h.click_paydoc_id,h.merchant_trans_id,h.action,
                h.sign_time, h.error,h.error_note,h.sign_string,h.click_trans_id,h.merchant_trans_id])
                .then((rest) => {
                    
            res.json({ 
                click_trans_id:h.click_trans_id,
                merchant_trans_id: h.merchant_trans_id, 
                merchant_prepare_id:rest[0][1][0].id,
                error: 0,
                error_note: "Success" })
        }).catch((err) => {
            console.error(err)
             res.json({ error: 2, error_note: "Not" });
        })
    } else
        res.json({ error: 2, error_note: "Not" });
})

// click etab 3
app.use("/click/3", async(req, res) => {
    const h =req.body 
    // console.log('click3')
    if (h.action == '1' && h.error == '0') {
       const md5hash = md5(h.click_trans_id+h.service_id+SECRET_KEY+h.merchant_trans_id+h.merchant_prepare_id+h.amount+h.action+h.sign_time)
        if(md5hash==req.body.sign_string){
            // console.log(md5hash==req.body.sign_string)
            pool.promise().query(`UPDATE click_order SET action=1 WHERE id=? ;
             UPDATE orders SET payme_state=1 ,state=2 WHERE id=?; `,
             [req.body.merchant_prepare_id,req.body.merchant_trans_id])
            .then((rest) => {
                sendClickTrans(req.body.merchant_trans_id)
                 res.json({ 
                    click_trans_id:h.click_trans_id,
                    merchant_trans_id: h.merchant_trans_id, 
                    merchant_prepare_id:h.merchant_prepare_id,
                    error: 0,
                    error_note: "Success" 
                    });
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