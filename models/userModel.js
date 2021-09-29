const f = require('session-file-store');
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

userModel.blok=function(newUser,result){
    pool.query("call blok_user(?,?)",newUser,function(err,res,field){
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
userModel.change_user=function(newUser,result){
    pool.query("call change_user(?,?,?,?,?)",newUser,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

userModel.getAllUsers=function(result){
    pool.query(`SELECT u.id,u.last_name,u.first_name,u.address,u.phone,u.role_id,u.isActive status,r.name role,
    date_format(u.created_on,'%Y-%m-%d, %h:%i:%s') created_on
    FROM users u inner join roles r on r.id=u.role_id where r.id!=1`,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

userModel.getEmployee=function(result){
    pool.query(`SELECT u.id,u.last_name,u.first_name,u.address,u.phone,u.role_id,u.isActive status,r.name role,
    date_format(u.created_on,'%Y-%m-%d, %h:%i:%s') created_on
    FROM users u inner join roles r on r.id=u.role_id where r.id!=1 and r.id!=3`,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

userModel.roleEdit=function(data,result){
    pool.query("call user_role_edit(?,?,?)",data,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


userModel.getSalesmen=function(result){
    pool.query(`SELECT id,first_name,last_name  FROM ecommerce_shop.users where role_id=4`,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


userModel.filter=function(query,result){
    const {ism,fam,phone}=query
    // if(ism+fam+phone=="")
    // return result(null,[])
    pool.query(`SELECT id,last_name ism,first_name fam,phone FROM users 
    where upper(first_name) like upper("%${ism||""}%")
    and upper(last_name) like upper("%${fam||""}%")
    and upper(phone) like upper("%${phone||""}%")
    order by last_name desc`,[ism||"",fam||"",phone||""],function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}
userModel.filter({ism:"a"},(err,res)=>console.log(res))
module.exports=userModel;