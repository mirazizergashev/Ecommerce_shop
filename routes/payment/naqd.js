const express = require("express");
const app = express();

const pool = require("../../database/db");
const {authCheck,access} = require("../../middleware/auth");
const { sendClickTrans } = require("../../botconnect")

app.post("/order", async (req, res) => {

    let fish = req.body.fish || null;
    let mfy = req.body.mfy || null;
    let tel = req.body.phone || null;
    let viloyat = req.body.viloyat || null;
    let tuman = req.body.tuman || null;
    // console.log('llll')
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


app.post("/naqd", async (req, res) => {
    if (req.body) {
        req.promokod = {
            Run: cost => 0
        }
        if (req.body.promokod) {
            //promokod
            // console.log("promokod")
            const result = await pool.promise()
                .query("call promokod_checker(?)", [req.body.promokod])
                .then((rest) => {

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

        pool.query("select * from dostavka_type where id=?", req.body.dostavka_id||1, async (err, rslt) => {
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

            pool.promise().query(`insert into orders (user_id,state,sana,fish,phone,viloyat,tuman,mfy,dostavka_id,isNaqd) 
    values (?,1 ,now(),?,?,?,?,?,?,1) ;`,
                    [req.session.userId||null, fish, tel, viloyat, tuman, mfy, req.body.dostavka_id||1])
                .then((rest) => {
                    let   data= req.body.product_id, s = "", a = [], notFounds = [], lessProd = []
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
                        let updateData=""
                        data.forEach((e, i) => {
                            if (rows[i].length == 0) {
                                notFounds.push({
                                    id: e.product_id,
                                    name: e.name
                                })
                            } else {
                                if (rows[i][0].count * 1 < e.count*1) {
                                    lessProd.push({
                                        id: e.product_id,
                                        name: e.name,
                                        count: e.count
                                    })
                                } else {
                                    updateData+=`UPDATE product SET count=${rows[i][0].count * 1 - e.count} 
                                    WHERE id =${rows[i][0].id};`
                                    rows[i][0].cost = rows[i][0].cost * 1 * (100 - 1 * rows[i][0].discount) / 100
                                    rows[i][0].cost2 = rows[i][0].cost2 * 1 * (100 - 1 * rows[i][0].discount) / 100
                                    if (rows[i][0].cost < 0) rows[i][0].cost = 0
                                    changeCosts(rows[rows.length - 1], rows[i])

                                }
                            }
                        });
                        let check={}
                        if (notFounds.length > 0) check.notFounds = notFounds
                        if (lessProd.length > 0) check.lessProd = lessProd
                        if (check.notFounds && check.lessProd) {
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
                        "; UPDATE orders SET amount=?,promokod_id=?,discount=? WHERE id=?;"+updateData,aso,(err,row2)=>{
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
                                        ru: "Заказ принят! Наши сотрудники свяжутся с вами в ближайшее время!"
                                    }
                                }
                            })

                    })

                  
                })
                
            }).catch((err) => {
                    console.log("'naqt xatosi'",err)
                    res.json({
                        error: 2,
                        error_note: "Not"
                    });
                })

        })

    }



})

app.get("/naqd/cancel/:id",access("orders"),(req,res)=>{
    pool.query("call cancel_order(?,?);",[req.params.id,req.session.userId],(err,rows)=>{
        if (err) {
            console.log(err)
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
                    code: 200,
                    success: {
                        message: {
                            uz: "Buyurtma bekor qilindi!",
                            en: "A new user has been created!",
                            ru: "Заказ otmenet!"
                        }
                    }
                })

                case '403':
                    res.status(200).json({
                        code: 403,
                        error: {
                            message: {
                                uz: "Sizga bu ma'lumotlardan foydalanishga ruxsat berilmagan",
                                ru: "Вам не разрешено использовать эту информацию",
                                en: "You are not allowed to use this information"
                            }
                        }
                    })
                    break;

            default:
                res.status(200).json({
                    code: 418,
                    success: {
                        message: {
                            uz: "Bunday buyurtma topilmadi !",
                            en: "Rejected due to server error!",
                            ru: "Bunday buyurtma topilmadi !"
                        }
                    }
                })

        }
       
    })
})

app.post("/getMoney",authCheck, async (req, res) => {
    let a = req.body;
    var data = [
        a.order_id,
        req.session.userId||0,
        a.hol||3,
        req.session.userId
    ]
    pool.query(`call ecommerce_shop.naqd_getting(?,?,?,?);`,data,(err,result,fld)=>{
        // console.log(result)
        if(err){
            console.log(err)
            return res.status(200).json({
                code: 400,
                error: {
                    message: {
                        uz: "Bunday holat hali bo`lmaydi yani zakaz atmena qilinishi",
                        en: "Product feature changed!",
                        ru: "Характеристики продукта изменены!"
                    }
                }
            })
        }
        switch (result[0][0].natija+"") {
            case '1':
                return res.status(200).json({
                    code: 203,
                    success: {
                        message: {
                            uz: "Buyurtma yetqazildi va to`lov olindi!",
                            en: "Product feature saved!",
                            ru: "Функция продукта сохранена!"
                        }
                    }
                })
            break;

            case '403':
                res.status(200).json({
                    code: 403,
                    error: {
                        message: {
                            uz: "Sizga bu ma'lumotlardan foydalanishga ruxsat berilmagan",
                            ru: "Вам не разрешено использовать эту информацию",
                            en: "You are not allowed to use this information"
                        }
                    }
                })
                break;

            case '2':
                return res.status(200).json({
                    code: 203,
                    error: {
                        message: {
                            uz: "Bunday holat hali bo`lmaydi yani zakaz atmena qilinishi",
                            en: "Product feature changed!",
                            ru: "Характеристики продукта изменены!"
                        }
                    }
                })

            case '3':
                return res.status(200).json({
                    code: 400,
                    error: {
                        message: {
                            uz: "Buyurtma topilmadi!",
                            en: "No product found!",
                            ru: "Товар не найден!"
                        }
                    }
                })
                case '4':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Bunday Curyer topilmadi!",
                                en: "Category feature not found!",
                                ru: "Функция категории не найдена!"
                            }
                        }
                    })

                    case '5':
                        return res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Status topilmadi!",
                                    en: "Category feature not found!",
                                    ru: "Функция категории не найдена!"
                                }
                            }
                        })
    
        
            default:

                return res.status(200).json({
                    code: 418,
                    success: {
                        message: {
                            uz: "Kutilmagan xatolik adminga xabar bering !",
                            en: "Report an unexpected error to the admin!",
                            ru: "Сообщите администратору о непредвиденной ошибке!"
                        }
                    }
                })




        }
    })
})


function changeCosts(c, data) {
    let k,cost,ind,maxCost,minCost
    data.forEach((e, i) => {
        maxCost=e.maxCost
        minCost=e.minCost
        k = e.category_id, cost = e.cost, ind = c.findIndex(x => (x.id == k));
    //    console.log(i,k,ind)
        while (ind != -1) {
            cost = parseInt(cost * (100 + c[ind].percent * 1) / 100) + 1 * c[ind].isFoiz
            if(e.maxCost){
                maxCost= parseInt(maxCost * (100 + c[ind].percent * 1) / 100) + 1 * c[ind].isFoiz 
            }
            if(e.minCost){
                minCost= parseInt(minCost * (100 + c[ind].percent * 1) / 100) + 1 * c[ind].isFoiz 
            }
            ind = c.findIndex(x => (x.id == c[ind].sub))
    //    console.log(i,k,ind,"|")

        }
        data[i].cost = cost * (100 - data[i].discount * 1) / 100;
        if(e.minCost) data[i].minCost = minCost * (100 - data[i].discount * 1) / 100;
        if(e.maxCost) data[i].maxCost = maxCost * (100 - data[i].discount * 1) / 100;
    });
    return data
}

module.exports = app;