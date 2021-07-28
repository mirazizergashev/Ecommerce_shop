var pool= require('../database/db');

var userModel=function(){}

userModel.user_edit_insert=function(newUser,result){
    pool.query("call user_edit_insert(?,?,?,?,?,?)",newUser,function(err,res,field){
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

userModel.getAllEmployees=function(result){
    sql.query("SELECT * FROM  `employee`",function(err, rows, fields){
        if(err){
            return result(err,null);
        }else{
            return result(null,rows);
        }
    });
}
userModel.getEmployeeById=function(employee_id,result){
    sql.query("SELECT employee.*,company.name as company_name FROM employee  LEFT JOIN company ON company.id=employee.company_id WHERE employee.id="+employee_id,function(err,rows){
        if(err)
            return result(err);

        if (rows.length <= 0) {
            return result(err);
        }
        else { 
            return result(rows);
        }  
    });
}
module.exports=userModel;