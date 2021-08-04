var pool= require('../database/db');

var promokodModel=function(){}

promokodModel.promokod_edit_insert=function(tokIdIsFoizAmount,result){
    pool.query("call promokod_edit_insert(?,?,?,?)",tokIdIsFoizAmount,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

promokodModel.getAll=function(result){
    pool.query("SELECT * FROM promocode where isActive=1",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


module.exports=promokodModel;