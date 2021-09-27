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
paymentModel.getAllCancelPayment = function (count,result) {


    pool.query(`SELECT t.id,t.state,t.order_id as 'order',o.praduct_id as product,o.amount as narx FROM transactions 
    t inner join orders o on t.order_id=o.id where t.state=-2`, function (err, data) {
        if (err) {
            return result(err, null);
        } else {
            
            return result(null, data);
        }
    });
}


paymentModel.getCuryerProd = function (id,result) {
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


paymentModel.getCuryerAll = function (result) {
    pool.query(`SELECT t.id,t.state,t.order_id as 'order',o.praduct_id as product,o.amount as narx FROM transactions 
    t inner join orders o on t.order_id=o.id where t.state=2`, function (err, data) {
        if (err) {
            return result(err, null);
        } else {
            // console.log(data[0].product)
           let arr=[];
           data.forEach((e)=>{
                arr.push(eval(e.product))
           })
           arr=arr.flat(2)
            console.log(arr)
            return result(null, data);
        }
    });
}


module.exports = paymentModel;