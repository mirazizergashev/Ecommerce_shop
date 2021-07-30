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

roleModel.getAll=function(result){
    pool.query("SELECT * FROM roles",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

roleModel.getAll((err,rows)=>{
    console.log(rows)
    if (err) {
        console.log(err);
        return res.status(200).json({
            code: 500,
            error: {
                message: {
                    uz: "Serverda xatolik tufayli rad etildi !",
                    en: "Rejected due to server error!",
                    ru: "Отклонено из-за ошибки сервера!"
                }
            }
        })
    }
})

module.exports=roleModel;