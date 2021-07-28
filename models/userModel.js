var pool= require('../database/db');

var userModel=function(){}

userModel.user_edit_insert=function(newUser,result){
    pool.query("call user_edit_insert(?,?,?,?,?,?,?)",newUser,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}


userModel.user_login=function(newUser,result){
    pool.query("call login_check(?,?)",newUser,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

module.exports=userModel;