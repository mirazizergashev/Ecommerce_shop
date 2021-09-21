const e = require('express');
var pool = require('../database/db');
const { product } = require('../utils/product');

var paymentModel = function () { }


paymentModel.getTop = function (count,result) {


    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url FROM  product as p 
    left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    where p.isActive=1 and p.isTop=1 ${"limit "+(count||1000)};
    select * from category where isActive=1;`, function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            let data = changeCosts(res[1], res[0])
            return result(null, data);
        }
    });
}


paymentModel.changeTop = function (id,isTop,result) {


    pool.query(`update product set isTop=? where id=?`,[isTop,id], function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });
}

paymentModel.All = function (result) {


    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url FROM  product as p 
    left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    where p.isActive=1;
    select * from category where isActive=1;`, function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            let data = changeCosts(res[1], res[0])
            return result(null, data);
        }
    });
}

paymentModel.getOne = function (id=0,result) {
    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url FROM  product as p 
    left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    where p.isActive=1 and p.id=?;
    select * from category where isActive=1;`,id, function (err, res) {
        if (err) {
            return result(err, null);}
            else{
            let data = changeCosts(res[1], res[0])
            return result(null, data);}
        
    });
}


module.exports = paymentModel;