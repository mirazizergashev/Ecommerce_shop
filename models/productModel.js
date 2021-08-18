const e = require('express');
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

//admin tasdiqlashi
productModel.check_product=function(data,result){
    pool.query("call check_product(?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}



//rasm yuklash
productModel.product_image=function(data,result){
    pool.query("call product_image(?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

productModel.getAll=function(id,ses,result){
    let s='';
    if(id==3){
        s='checked';
    }
    else{
        s=id
    }
    
    console.log(s)
    pool.query(`SELECT * FROM product where isActive=1 and checked=${s} and user_id=${ses}`,function(err,res){
        if(err){
            return result(err,null);
        }else{
            console.log(res)
            return result(null,res);
        }
    });
}
productModel.All=function(result){
   
    
    pool.query(`SELECT * FROM product;`,function(err,res){
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
    pool.query(`SELECT cp.* FROM product_properties cp  where cp.product_id=?;`,id||0,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}
module.exports=productModel;