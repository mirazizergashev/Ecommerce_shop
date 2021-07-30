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

userModel.editPassword=function(data,result){
    pool.query("call password_edit(?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

userModel.getMe=function(userId,result){
    pool.query("SELECT last_name ism,first_name fam,phone,address FROM users where id=?",userId,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

userModel.roleEdit=function(data,result){
    pool.query("call user_role_edit(?,?)",data,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}



module.exports=userModel;