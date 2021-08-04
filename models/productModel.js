var pool= require('../database/db');
const { product } = require('../utils/product');

var productModel=function(){}

productModel.product_edit_insert=function(data,result){
    pool.query("call product_edit_insert(?,?,?,?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

productModel.getAll=function(result){
    pool.query("SELECT * FROM category",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


productModel.getSub=function(id,result){
    pool.query("SELECT * FROM category where sub=?",id||0,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


productModel.product_properties_edit_insert=function(data,result){
    pool.query("call product_properties_edit_insert(?,?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

productModel.getProperties=function(id,result){
    pool.query(`SELECT cp.*,t.name type FROM category_properties cp inner join types t on t.id=cp.type_id
    and t.isActive=1  where cp.category_id=?;`,id||0,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}
module.exports=productModel;