var pool= require('../database/db');

var promokodModel=function(){}

promokodModel.promokod_edit_insert=function(data,result){
    pool.query("call promokod_edit_insert(?,?,?,?,?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

promokodModel.checkPromokod=function(token,result){
    pool.query("call promokod_checker(?)",[token],function(err,res){
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
    pool.query("SELECT p.*,date_format(p.deadline,'%Y-%m-%d, %h:%i:%s') deadline,date_format(p.created_on,'%Y-%m-%d, %h:%i:%s') created_on,concat(u.last_name,\" \",u.first_name) username"
    +", (SELECT count(*) from orders WHERE promokod_id=p.id) numberOfUse FROM promokod p left join users u on u.id=p.user_id where p.isActive=1 order by p.created_on desc  limit ?,?",[step*1*count,count*1],function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


promokodModel.getFresh=function(query,result){
    const step=query.step||0,count=query.count||15
    pool.query("SELECT * FROM promokod where user_id is null  where p.isActive=1 limit ?,?",[step*1*count,count*1],function(err,res){
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
    +" FROM promokod p inner join users u on u.id=p.user_id  where p.isActive=1 limit ?,?",[step*1*count,count*1],function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}





module.exports=promokodModel;