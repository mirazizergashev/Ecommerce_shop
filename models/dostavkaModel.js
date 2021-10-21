var pool= require('../database/db');
const { category } = require('../utils/category');

var dostavkaModel=function(){}

dostavkaModel.dostavka_edit_insert=function(data,result){
    pool.query("call dostavka_edit_insert(?,?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

dostavkaModel.getAll=function(roleId,result){
    console.log(`SELECT * from dostavka_type 
    ${(roleId==1||roleId==2)?"":"WHERE isActive=1"}`)
    pool.query(`SELECT * from dostavka_type 
    ${(roleId==1||roleId==2)?"":"WHERE isActive=1"}`,
    function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

module.exports=dostavkaModel;