var pool= require('../database/db');

var categoryModel=function(){}

categoryModel.cart_edit_insert=function(idUserProdCountStatus,result){
    pool.query("call cart_edit_insert(?,?,?,?,?)",idUserProdCountStatus,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}
categoryModel.delivered_edit_insert=function(data,result){
    pool.query("call cart_edit_insert(?,?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

categoryModel.getAll=function(id,result){
    pool.query("SELECT * FROM cart where user_id=?",[id],function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

module.exports=categoryModel;