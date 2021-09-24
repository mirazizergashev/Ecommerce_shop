var pool= require('../database/db');

var promokodModel=function(){}

promokodModel.promokod_edit_insert=function(data,result){
    pool.query("call promokod_edit_insert(?,?,?,?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

promokodModel.promokod_edit=function(data,result){
    pool.query("call promokod_edit(?,?,?,?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

promokodModel.getAll=function(query,result){
    const step=query.step||0,count=query.count||15
    pool.query("SELECT p.*,concat(u.last_name,\" \",u.first_name) username"
    +" FROM promokod p left join users u on u.id=p.user_id limit ?,?",[step*1*count,count*1],function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


promokodModel.getFresh=function(query,result){
    const step=query.step||0,count=query.count||15
    pool.query("SELECT * FROM promokod where user_id is null limit ?,?",[step*1*count,count*1],function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


promokodModel.getBusy=function(query,result){
    const step=parseInt(query.step||0),count=parseInt(query.count||15)
    console.log({step,count})

    pool.query("SELECT p.*,concat(u.last_name,\" \",u.first_name) username"
    +" FROM promokod p inner join users u on u.id=p.user_id limit ?,?",[step*1*count,count*1],function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}





module.exports=promokodModel;