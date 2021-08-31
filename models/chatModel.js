var pool= require('../database/db');

var chatModel=function(){}

chatModel.chat_edit_insert=function(data,result){
    pool.query("call chat_edit_insert(?,?)",data,function(err,res,field){//id,file,text,stars,expire_date,isActive
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

chatModel.getChatId=function(id,result){
    pool.query("SELECT * FROM chats where user_id=? ",id,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

chatModel.smsAdmin=function(text,result){
    pool.query("call smsAdmin(?)",text,function(err,res,field){//id,file,text,stars,expire_date,isActive
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}
chatModel.getMyMessage=function(id,result){
    console.log(id)
    pool.query("SELECT * FROM chats where user_id=? ",id,function(err,res){
        if(err){
            return result(err,null);
        }else{
            pool.promise().query("update chats set isNew=0 where user_id=?",id)
            return result(null,res);
        }
    });
}

chatModel.getAll=function(result){
    pool.query("SELECT * FROM chats ",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

module.exports=chatModel;