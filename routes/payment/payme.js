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
const {
    sendClickTrans
} = require("../../botconnect");
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
    if (req.body) {
        pool.query("select * from dostavka_type where id=?", req.body.dostavka_id||1, async (err, rslt) => {
            if (err) {
                console.error(1,err);
                return res.json({ error: 2, error_note: "Not" });
            }
            req.Dostavka = (amount) => Math.ceil((amount * 1 + rslt[0].cost * 1) * 100) / 100;


            let fish = req.body.fish || "fish";
            let mfy = req.body.mfy || "mfy";
            let tel = req.body.phone || "phone";
            let viloyat = req.body.viloyat || "viloyat";
            let tuman = req.body.tuman || "tuman";
            req.body.amount = Math.ceil(req.body.amount / 100) * 100

            pool.promise()
                .query("insert into orders (user_id,amount , payme_state , state , phone ,sana,fish,viloyat,tuman,mfy,dostavka_id) " +
                    "values (?,0,0,0,?,now(),?,?,?,?,?);",
                    [req.session.userId || null, tel, fish, viloyat,
                        tuman, mfy, req.body.dostavka_id||1])
                .then(async (rest) => {
                    //  console.log(rest[0][1])
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
                            aso = [], summa = 0
                        data.forEach((e, i) => {
                            so += `(?,?,?,?,?,?,?),`
                            aso.push(rest[0].insertId, e.product_id, e.count, rows[i][0].cost,
                                req.promokod.Run(rows[i][0].cost), rows[i][0].name,
                                rows[i][0].cost * 1 - req.promokod.Run(rows[i][0].cost * 1) - rows[i][0].cost2 * 1)
                            summa += rows[i][0].cost;
                        })
                        aso.push(req.Dostavka(summa - req.promokod.Run(summa)),
                            req.promokod.id || null, req.promokod.Run(summa),

                            rest[0].insertId)
                        pool.query(so.slice(0, -1) +
                            "; UPDATE orders SET amount=?,promokod_id=?,discount=? WHERE id=?", aso, (err, row2) => {
                                if (err) {
                                    console.error(2,{
                                        err
                                    })
                                    return res.json({
                                        error: 2,
                                        error_note: "Not"
                                    });
                                }
                                //Order Yaratildi.....
                                sendClickTrans(rest[0].insertId)
                                bu = Buffer.from(`m=${merchant};ac.order=${rest[0].insertId};a=${parseInt(100*req.Dostavka(summa - req.promokod.Run(summa))) }`).toString('base64')

                                res.redirect(`/payme-ghvcjhbcfkrhkjdfhkjdfn/${bu}`);

                            })



                    })
                    })
.catch((err) => {
                        console.log("catch",err)
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




function changeCosts(c, data) {
    data.forEach((e, i) => {
        let k = e.category_id,
            cost = e.cost,
            ind = c.findIndex(x => x.id == k);

        while (ind != -1) {
            cost = parseInt(cost * (100 + c[ind].percent * 1) / 100) + 1 * c[ind].isFoiz
            ind = c.findIndex(x => x.id == c[ind].sub)
        }
        data[i].cost = cost * (100 - data[i].discount * 1) / 100;
    });
    return data
}


module.exports = app;