const express = require("express");
const app = express();
const pool = require("../../database/db")
const CheckPerformTransaction = require("./CheckPerformTransaction")
const CreateTransaction = require("./CreateTransaction")
const CheckTransaction = require("./CheckTransaction")
const PerformTransaction = require("./PerformTransaction")
const CancelTransaction = require("./CancelTransaction")
const check = require("../../middleware/auth").authCheck;
const session = require("express-session");
const merchant = "6135b21ec517ef555a8accac"

//tekshrish 
function checkAuth(auth) {
    return auth &&
        (buff = Buffer.from(auth.split(" ")[1], 'base64')) &&
        (str = buff.toString('utf-8')) &&
        str.split(":")[1] == 'wkGai2gb3P@91QqCBiiMb%fb99UHgw2g%44k';
}

// payme etab 1
app.use("/payme/1", async (req, res) => {
    req.body = req.query
  
    if (req.body) {
        pool.query("select * from dostavka_type where id=?",req.body.dostavka_id,async (err,rslt)=>{
            if(err){console.error(err);
              return res.json({ error: 2, error_note: "Not" });}
              req.body.amount=req.body.amount*1+rslt[0].cost*1
              req.body.amount=Math.ceil(req.body.amount*100)/100
              console.log(req.body.amount)
  let sn="",sv="",disc
        const datee = new Date().getTime();
        if (req.body.promokod) {
            //promokod
           console.log("promokod")
           const result=await pool.promise()
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
                    if (rest[0][0][0].isActive == 0 || rest[0][0][0].count*1 <= 0) {
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
                    return  rest[0][0][0]
                    
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
                    console.log(result.error)
                   return res.json({ error: 2, error_note:result.error.message  });
                }
                 sn=`,promokod_id,discount`
                 console.log("result.amount)",result.amount,"||",result.isFoiz*1)
                if(result.isFoiz*1){
                    console.log("is1")
                    disc=req.body.amount*1*(1*result.amount)/100
                }else{
                    console.log("is2")
                    disc=req.body.amount*1-1*result.amount
                }
                req.body.amount=req.body.amount*1-disc
                console.log("result.amount)",result.amount,"||",disc)
console.log(req.body.amount,"req.body.amount")
                sv=`,${result.id},${disc}`
    
        }
       
            let fish = req.body.fish || "fish";
            let mfy = req.body.mfy || "mfy";
            let tel = req.body.phone || "phone";
            let viloyat = req.body.viloyat || "viloyat";
            let tuman = req.body.tuman || "tuman";
            req.body.amount=Math.ceil(req.body.amount/100)*100
           
             pool.promise()
                .query("insert into orders (user_id,amount , payme_state , state , phone ,sana,praduct_id,fish,viloyat,tuman,mfy,dostavka_id"+sn+") " +
                    "values (?,?,0,0,?,now(),?,?,?,?,?,?"+sv+") ; SELECT max(id) as id FROM orders WHERE phone=?",
                    [req.session.userId||null,req.body.amount, tel, req.body.praduct_id, fish, viloyat,
                        tuman, mfy, req.body.dostavka_id, tel])
                .then(async (rest) => {
                    //  console.log(rest[0][1])
                    bu = Buffer.from(`m=${merchant};ac.order=${rest[0][1][0].id};a=${req.body.amount *100}`).toString('base64')
                    console.log(rest[0][1][0].id)
pool.promise().query("call ecommerce_shop.promokod_use(?, -1);",rest[0][1][0].id)
.then(e=>{

})
.catch(err=>console.log({error:"promokod change",err}))
                    res.redirect(`/payme-ghvcjhbcfkrhkjdfhkjdfn/${bu}`);
                }).catch((err) => {
                    console.log(err)
                    res.json({ error: 2, error_note: "Not" });
                })

            })
        
    }
})


// payme etab 2
app.use("/payme/2", async (req, res) => {
    data = req.body
    // console.log(data)

    if (!(data && data.id)) {
        return res.json({
            error: {
                code: -32504,
                message: 'AccessDeniet',
                data: null
            }
        })
    }


    if (!checkAuth(req.headers['authorization'])) {
        return res.json({
            error: {
                code: -32504,
                message: 'AccessDeniet',
                data: null
            }
        })
    }



    switch (data.method) {
        case "CheckPerformTransaction":
            CheckPerformTransaction(req.body, res);
            break;
        case "CreateTransaction":
            CreateTransaction(req.body, res);
            break;
        case "CheckTransaction":
            CheckTransaction(req.body, res);
            break;
        case "PerformTransaction":
            PerformTransaction(req.body, res);
            break;
        case "CancelTransaction":
            CancelTransaction(req.body, res);
            break;
        default:
            res.json({
                "error": {
                    code: "-0001",
                    message: "Not Method "
                }
            })
            break;
    }

})

app.get("/money", async (req, res) => {
    await pool.promise().query("SELECT name,id FROM product; ").then((rest) => {
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




module.exports = app;