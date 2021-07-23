const express = require("express");
const router = express.Router();
const schema = require('../../models/product')
const Joi = require("joi");
const pool = require('../../database/db');


router.get('/myMeals', (req, res) => {
    
    pool.query(`SELECT p.name,sh.product_id,sum(sh.count) count,p.measure,0 isSklad FROM share_product sh
    inner join product p on p.id=sh.product_id where sh.to_id=? group by sh.product_id;
    SELECT product_id,sum(count) count FROM share_product where from_id=? group by product_id;
    SELECT p.name,sh.product_id,sum(sh.count) count,p.measure,1 isSklad FROM share_product_sklad sh
    inner join sklad p on p.id=sh.product_id where sh.to_id=? group by sh.product_id;
    SELECT product_id,sum(count) count FROM share_product_sklad where from_id=? group by product_id;
    `,
        [req.session.userId || 0, req.session.userId || 0, req.session.userId || 0, req.session.userId || 0], (err, rows, fields) => {
                if (err) {
                    console.log(err)
                    return res.status(200).json({
                        code: 500,
                        error: {
                            message: "Serverda xatolik tufayli rad etildi !"
                        }
                    })
                }
console.log(rows)
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
                        rows[2].forEach(e=>{
                            rows[0].push(e)
                        })
        res.status(200).json({ code: 200, success: { data: rows[0] } })
                

            });
});

router.post('/check_order', (req, res) => {
    const { product_id, count } = req.body
    pool.query(`SELECT product_id,sum(count) count FROM share_product where to_id=? group by product_id;
    SELECT product_id,sum(count) count FROM share_product where from_id=? group by product_id;
    SELECT product_id,sum(count) count FROM share_product_sklad where to_id=? group by product_id;
    SELECT product_id,sum(count) count FROM share_product_sklad where from_id=? group by product_id;
    SELECT * FROM shafran.retsep where  product_id=?;
    `,
        [req.session.userId || 0, req.session.userId || 0, req.session.userId || 0, req.session.userId || 0,
            product_id], (err, rows, fields) => {
                if (err) {
                    console.log(err)
                    return res.status(200).json({
                        code: 500,
                        error: {
                            message: "Serverda xatolik tufayli rad etildi !"
                        }
                    })
                }
                let a = {}, b = {}, result = []
                for (let i = 0; i < rows[0].length; i++)
                    for (let j = 0; j < rows[1].length; j++)
                        if (rows[0][i].product_id == rows[1][j].product_id) {
                            a[rows[0][i].product_id] = rows[0][i].count - rows[1][j].count
                        }
                for (let i = 0; i < rows[2].length; i++)
                    for (let j = 0; j < rows[3].length; j++)
                        if (rows[2][i].product_id == rows[3][j].product_id) {
                            b[rows[2][i].product_id] = rows[2][i].count - rows[3][j].count
                        }

                rows[4].forEach(e => {
                    if (!e.isSklad) {
                        if (a[e.root_product_id]) {
                            if (e.count * count > a[e.root_product_id].count)
                                e.count = e.count * count - a[e.root_product_id].count
                        } else
                            e.count = e.count * count
                    } else
                        if (b[e.root_product_id]) {
                            if (e.count * count > b[e.root_product_id].count)
                                e.count = e.count * count - b[e.root_product_id].count
                        }
                        else
                            e.count = e.count * count
                    result.push(e)
                })
                if (result.length != 0) {
                    res.status(200).json({
                        code: 400, error: {
                            data: result,
                            message: {
                                uz: "Siz ushbu maxsulotdan yaratish uchun retseptdagi maxsulotlar yetarli emas!"
                            }
                        }
                    })
                } else {
                    let s="INSERT INTO `share_product` (`product_id`, `count`, `from_id`, `to_id`,"+
                    "`fdepart_id`, `tdepart_id`) VALUES"
                    let s0="INSERT INTO `share_product_sklad` (`product_id`, `count`, `from_id`, `to_id`,"+
                    "`fdepart_id`, `tdepart_id`) VALUES"
                   let ss=" (?, ?, "+req.session.userId+", '0', "+req.session.departId+", '0')";
                   let s1="INSERT INTO `share_product` (`product_id`, `count`, `from_id`, `to_id`,"+
                   "`fdepart_id`, `tdepart_id`) VALUES(?, ?,'0',"+req.session.userId+",'0',"+req.session.departId+")"

                   let x=[],y=[],x0=false,y0=false
                    rows[4].forEach(e => {
                        if(!e.isSklad){
                            if(x0)s+=','
                            else
                            x0=true
                            s+=ss
                            x.push(e.root_product_id,e.count*count)
                        }else{
                            if(y0)s0+=','
                            else
                            y0=true
                            s0+=ss
                            y.push(e.root_product_id,e.count*count)
                        }
                    })
                    y.forEach(e=>{
                        x.push(e)
                    })
                    x.push(product_id,count,product_id,count)
                    pool.query(s+";"+s0+";"+s1+";call product_counter(?,?);",x,(err,rows,fields)=>{
                        if (err) {
                            console.log(err)
                            return res.status(200).json({
                                code: 500,
                                error: {
                                    message: "Serverda xatolik tufayli rad etildi !"
                                }
                            })
                        }
                        res.json({ code: 200, success: { message:{uz:"Muvaffaqiyatli saqlandi!"} } })
                    })
                }

            });
});

router.get('/get/:id', (req, res) => {
    pool.query(`SELECT r.id,p.name,r.count FROM retsep r 
    inner join product p on r.root_product_id=p.id   where r.product_id=? group by p.name;SELECT r.id,p.name,r.count FROM retsep r 
    inner join sklad p on r.root_product_id=p.id   where r.product_id=? group by p.name`, [req.params.id || 2,req.params.id || 2], (err, rows, fields) => {
        if (err) {
            console.log(err)
            return res.status(200).json({
                code: 500,
                error: {
                    message: "Serverda xatolik tufayli rad etildi !"
                }
            })
        }
        
        let arr=[]
        rows[0].forEach(e => {
            arr.push(e);
        });
        rows[1].forEach(e => {
            arr.push(e);
        });
        // console.log(arr)
        res.status(200).json({code:200,success:{data:arr}})

    });
});

router.get('/barcha', (req, res) => {
    pool.query(`  SELECT p.id,p.name FROM retsep r 
    inner join product p on r.product_id=p.id   group by p.name  ;`,  (err, rows, fields) => {
        if (err) {
            console.log(err)
            return res.status(200).json({
                code: 500,
                error: {
                    message: "Serverda xatolik tufayli rad etildi !"
                }
            })
        }
        

        res.status(200).json({ code: 200, success: { data: rows } })

    });
});


//page qoshish.
router.post("/add", async (req, res) => {

    //validatsiyada xatolik
    const checked = schema.retsep.validate(req.body);
    if (checked.error) {
        // console.log(checked.error)
        const msg = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: msg[0],
                    en: msg[1],
                    ru: msg[2]
                }
            }

        });
    }


    let a = req.body;
    let mas = req.body.root;
    // console.log(a)
    console.log(mas)
    let s='';
    for(let i=0;i<mas.length;i++){
        s=s+`insert into retsep(product_id,root_product_id,count,isSklad) values(${a.prod},${mas[i].id},${mas[i].son},${mas[i].baza});`
    }
    pool.query(s, (err, rows, fields) => {
        console.log(s)
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
        return res.status(200).json({
            code: 200,
            success: {
                message: {
                    uz: "Yangi retsep yaratildi !",
                    en: "New recipe created!",
                    ru: "Создан новый рецепт!"
                }
            }
        })


    })


});






module.exports = router;