const e = require('express');
var pool= require('../database/db');

var orderModel=function(){}


orderModel.mainRating=function(result){
    pool.query(`select (SELECT count(*)  FROM ecommerce_shop.users where role_id=3) customers,
    (SELECT count(*)  FROM ecommerce_shop.users where role_id=4) salesmen,
    (SELECT count(*)  FROM ecommerce_shop.orders where state=2) orders,
    (SELECT sum(amount)  FROM ecommerce_shop.orders where state=2) benefit`,
    function(err,res,field){//id,file,text,stars,expire_date,isActive
        if(err){
            return result(err,null);
        }else{
          
            return result(null,res);
        }
    });
   
}


module.exports=orderModel;