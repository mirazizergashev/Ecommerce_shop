const e = require('express');
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

//
chatModel.getChats=function(isAdmin,result){
    pool.query(`SELECT c.user_id id,concat(u.last_name,' ',u.first_name) user,count(*) news FROM chats c
    inner join users u on u.id=c.user_id group by c.user_id;SELECT * FROM chats;`,
    function(err,res,field){//id,file,text,stars,expire_date,isActive
        if(err){
            return result(err,null);
        }else{
            // console.log(isAdmin)
            let data=res[0],d=res[1]
            console.log(data,d)
            data.forEach((elem,j) => {
                const x=d.filter(el=>el.user_id==elem.id && el.isNew==0 && el.isAdmin==isAdmin)
                console.log(x.length)
                data[j].news-=x.length
            });
            return result(null,data);
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

chatModel.chatStop=function(text,result){
    pool.query("call chatStop(?)",text,function(err,res,field){//id,file,text,stars,expire_date,isActive
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