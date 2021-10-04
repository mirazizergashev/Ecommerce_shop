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
    pool.query(`SELECT o.id,o.fish,concat(o.viloyat," ",o.tuman," ",o.mfy) as address,o.amount as price,(
        case o.state when 0 then "Ko'rilmoqda"
        when 1 then "Yaqinda yetkaziladi"
        when 2 then "Yetqazildi"
        when -1 then "Bekor qilinmoqda"
        else "Bekor qilindi" end
        ) as status,
        (case  when (o.isClick=0 and o.isNaqd=0) then "Payme"
        when (o.isClick=1) then "Click"
        else "Joyida to'lov" end
        ) as paymentType,
        d.name as deliveryType,
        o.sana as created
         FROM orders o inner join dostavka_type d on o.dostavka_id=d.id;`, function (err, data) {
        if (err) {
            return result(err, null);
        } else {

            return result(null, data);
        }
    });
}


paymentModel.getOrdersAll = function (result) {
    pool.query(`SELECT o.id,o.fish,concat(o.viloyat," ",o.tuman," ",o.mfy) as address,o.amount as price,(
        case o.state when 0 then "Ko'rilmoqda"
        when 1 then "Yaqinda yetkaziladi"
        when 2 then "Yetqazildi"
        when -1 then "Bekor qilinmoqda"
        else "Bekor qilindi" end
        ) as status,
        (case  when (o.isClick=0 and o.isNaqd=0) then "Payme"
        when (o.isClick=1) then "Click"
        else "Joyida to'lov" end
        ) as paymentType,
        d.name as deliveryType,
        o.sana as created
         FROM orders o inner join dostavka_type d on o.dostavka_id=d.id;`, function (err, data) {
        if (err) {
            return result(err, null);
        } else {

            return result(null, data);
        }
    });
}

paymentModel.getOrdersAllCustomer = function (result) {
    pool.query(`SELECT o.id,(
        case o.state when 0 then "Ko'rilmoqda"
        when 1 then "Yaqinda yetkaziladi"
        when 2 then "Yetqazildi"
        when -1 then "Bekor qilinmoqda"
        else "Bekor qilindi" end
        ) as status,
        o.sana as created
         FROM orders o ;`, function (err, data) {
        if (err) {
            return result(err, null);
        } else {

            return result(null, data);
        }
    });
}


module.exports = paymentModel;