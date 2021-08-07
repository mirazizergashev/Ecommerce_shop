var pool= require('../database/db');

var promokodModel=function(){}

promokodModel.promokod_edit_insert=function(data,result){
    pool.query("call promokod_edit_insert(?,?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

promokodModel.getAll=function(result){
    pool.query("SELECT p.*,concat(u.last_name,\" \",u.first_name) username"
    +" FROM promokod p left join users u on u.id=p.user_id",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


promokodModel.getFresh=function(result){
    pool.query("SELECT * FROM promokod where user_id is null",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


promokodModel.getBusy=function(result){
    pool.query("SELECT p.*,concat(u.last_name,\" \",u.first_name) username"
    +" FROM promokod p inner join users u on u.id=p.user_id",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

module.exports=promokodModel;