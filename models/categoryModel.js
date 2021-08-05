var pool= require('../database/db');
const { category } = require('../utils/category');

var categoryModel=function(){}

categoryModel.category_edit_insert=function(data,result){
    pool.query("call category_edit_insert(?,?,?,?,?,?,?)",data,function(err,res,field){
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

categoryModel.getType=function(result){
    pool.query("SELECT * FROM types",function(err,res){
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


categoryModel.category_properties_edit_insert=function(data,result){
    pool.query("call category_properties_edit_insert(?,?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

categoryModel.getProperties=function(id,result){
    pool.query(`SELECT cp.*,t.name type FROM category_properties cp inner join types t on t.id=cp.type_id
    and t.isActive=1  where cp.category_id=?;`,id||0,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}
module.exports=categoryModel;