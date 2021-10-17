const { json } = require('express');
const e = require('express');
var pool = require('../database/db');
const { product } = require('../utils/product');

var paymentModel = function () { }

//barcha pul tushirilgan tolovlar
paymentModel.getAllSuccessPayment = function (result) {


    pool.query(`SELECT t.id,t.state,t.order_id as 'order',o.praduct_id as product,o.amount as narx FROM transactions 
    t inner join orders o on t.order_id=o.id where t.state=2`, function (err, data) {
        if (err) {
            return result(err, null);
        } else {
            // console.log(data[0].product)
            console.log(eval(data[0].product))
            return result(null, data);
        }
    });
}

//barcha pul tolab bekor qilingan tolovlar
paymentModel.getAllCancelPayment = function (count, result) {


    pool.query(`SELECT t.id,t.state,t.order_id as 'order',o.praduct_id as product,o.amount as narx FROM transactions 
    t inner join orders o on t.order_id=o.id where t.state=-2`, function (err, data) {
        if (err) {
            return result(err, null);
        } else {

            return result(null, data);
        }
    });
}


paymentModel.getCuryerProd = function (id, result) {
    pool.query(`SELECT t.id,t.state,t.order_id as 'order',o.praduct_id as product,o.amount as narx FROM transactions 
    t inner join orders o on t.order_id=o.id where t.state=2`, function (err, data) {
        if (err) {
            return result(err, null);
        } else {
            // console.log(data[0].product)
            console.log(eval(data))
            return result(null, data);
        }
    });
}


paymentModel.getOrdersAll = function (result) {
    pool.query(`SELECT o.id,o.fish,concat(o.viloyat," ",o.tuman," ",o.mfy) as address,o.amount as price,s.name as status,s.class,
    (case  when (o.isClick=0 and o.isNaqd=0) then "Payme"
    when (o.isClick=1) then "Click"
    else "Joyida to'lov" end
    ) as paymentType,
    d.name as deliveryType,
    o.sana as created
     FROM orders o inner join dostavka_type d on o.dostavka_id=d.id inner join statuses s on s.id=o.status order by o.sana desc `, function (err, data) {
        if (err) {
            return result(err, null);
        } else {

            return result(null, data);
        }
    });
}

paymentModel.getOrdersAllPostavshik = function (id,result) {
    pool.query(`SELECT p.id,p.name,s.count,(s.cost-s.discount) as price,ss.name as status,ss.class,
    date_format(o.sana,'%Y-%m-%d %h:%i:%s') as sana FROM suborder s inner join orders o on s.order_id=o.id 
    inner join product p on p.id=s.product_id   inner join dostavka_type d on o.dostavka_id=d.id inner join 
    statuses ss on ss.id=o.status where p.user_id=?`,id||0, function (err, data) {
        if (err) {
            return result(err, null);
        } else {
          
            if(data.length==0){
            return result(null, []);

            }
            let datas=[],cont,arr4=[],cont2=[]
            data.forEach((k,ii)=>{
                pool.query(`SELECT cp.field_name, GROUP_CONCAT(pp.values SEPARATOR '#') as content FROM product_properties pp inner join category_properties cp on 
                cp.id=pp.cat_prop_id where pp.product_id =? GROUP BY cp.field_name;`,k.id,(err1,row2,fff)=>{
                    console.log(err1)
                    row2.forEach((e, i) => {
                        cont = e.content.split('#')
                        for (let j = 0; j < cont.length; j++) {
                            cont2.push({ 'id': j + 1, 'content': cont[j] })
                        }
                        arr4.push({ 'title': e.field_name, 'data': cont2 })
                        cont2 = []
                    })
                    
                    datas.push({
                        id:ii+1,
                        name:k.name,
                        count:k.count,
                        price:k.price,
                        status:k.status,
                        class:k.class,
                        sana:k.sana,
                        properties:arr4
                    })
                    arr4=[]
                    if(data.length==ii+1){
                     
                        return result(null, datas);
                    }
                })
            })

            
        }
    });
}


paymentModel.getOrdersIn = function (id,result) {
    pool.query(`SELECT p.id,p.name,s.count,s.cost as price FROM suborder s inner join orders o on s.order_id=o.id 
    inner join product p on s.product_id=p.id where o.id=?;`,id, function (err, data) {
        if (err) {
            return result(err, null);
        } else {
            let arr4 = [], s4 = 0, cont = [], cont2 = [],arr5=[]
            data.forEach((k,j)=>{
                // pool.query(`SELECT cp.field_name, GROUP_CONCAT(pp.values SEPARATOR '#') as content FROM product_properties pp inner join category_properties cp 
                // on cp.id=pp.cat_prop_id where pp.product_id in 
                // (SELECT id FROM product where name in (SELECT name FROM product where id=?)) GROUP BY cp.field_name;`,[k.id,k.id], function (err1, data1) {
                //     // console.log(data)
                    pool.query(`SELECT cp.field_name, GROUP_CONCAT(pp.values SEPARATOR '#') as content FROM product_properties pp inner join category_properties cp 
                    on cp.id=pp.cat_prop_id where pp.product_id =? GROUP BY cp.field_name;`,[k.id,k.id], function (err1, data1) {
                    // console.log(data)
                    data1.forEach((e, i) => {
                        cont = e.content.split('#')
                        for (let j = 0; j < cont.length; j++) {
                            cont2.push({ 'id': j + 1, 'content': cont[j] })
                        }
                        arr4.push({ 'title': e.field_name, 'data': cont2 })
                        
                        cont2 = []
                    })
                    arr5.push({id:k.id,name:k.name,count:k.count,price:k.price,properties:arr4})
                    arr4=[]
                    if(data.length==j+1){
                        // console.log(arr4)
                        return result(null, arr5);
                    }
                })
            })
            
            
        }
    });
}

paymentModel.getOrdersAllCustomer = function (result) {
    pool.query(`SELECT o.id,s.name as status,
    o.sana as created
     FROM orders o inner join statuses s on s.id=o.status;`, function (err, data) {
        if (err) {
            return result(err, null);
        } else {

            return result(null, data);
        }
    });
}


module.exports = paymentModel;