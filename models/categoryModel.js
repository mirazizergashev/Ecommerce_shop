var pool= require('../database/db');

var categoryModel=function(){}

categoryModel.category_edit_insert=function(data,result){
    pool.query("call category_edit_insert(?,?,?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

categoryModel.getAll=function(result){
    pool.query("SELECT * FROM category",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


categoryModel.getSub=function(id,result){
    pool.query("SELECT * FROM category where sub=?",id||0,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}
module.exports=categoryModel;