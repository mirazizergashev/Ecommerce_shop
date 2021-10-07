var pool= require('../database/db');

var roleModel=function(){}

roleModel.rol_edit_insert=function(idNameStatus,result){
    pool.query("call rol_edit_insert(?,?,?)",idNameStatus,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}
roleModel.status_edit_insert=function(idNameStatus,result){
    pool.query("call status_edit_insert(?,?,?)",idNameStatus,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

roleModel.getAll=function(result){
    pool.query("SELECT * FROM roles where id!=1",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

roleModel.getAllStatus=function(result){
    pool.query("SELECT * FROM statuses where isActive!=0",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


module.exports=roleModel;