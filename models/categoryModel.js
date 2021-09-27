var pool= require('../database/db');
const { category } = require('../utils/category');

var categoryModel=function(){}

categoryModel.category_edit_insert=function(data,result){
    pool.query("call category_edit_insert(?,?,?,?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

categoryModel.getAll=function(role_id,result){
    pool.query(`SELECT *,date_format(created_on,'%Y-%m-%d, %h:%i:%s') created_on
    FROM category ${(role_id==1)?"":" where isActive=1"};
    select 'Bosh kategoriyalar' title`,
    function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}
categoryModel.delete=function(id,result){
    pool.query("SELECT id,sub,isActive FROM category;SELECT isActive FROM category where id=?;",id,
    function(err,res){
        if(err)
            return result(err,null);
        else
            pool.query(`update category set isActive=${(parseInt(res[1][0].isActive)+1)%2} where id in (${id+getSubCategory(res[0],id)})`,
            function(err,rows){
                if(err) return result(err,null);
                return result(null,rows);
        })
    });  
}



categoryModel.getDostavka=function(id,result){
    pool.query("SELECT * FROM ecommerce_shop.dostavka_type",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

categoryModel.getRegions=function(id,result){
    pool.query("SELECT * FROM regions where sub=?",[id||1],function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

categoryModel.getAllProp=function(result){
    pool.query("SELECT * FROM category_properties;",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

categoryModel.getType=function(result){
    pool.query("SELECT * FROM types",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


categoryModel.getSub=function(id,result){
    pool.query("SELECT *,date_format(created_on,'%Y-%m-%d, %h:%i:%s') created_on FROM category where sub=? and isActive=1;select name title from category where id=? and isActive=1",
    [id||0,id||0],function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


categoryModel.category_properties_edit_insert=function(data,result){
    pool.query("call category_properties_edit_insert(?,?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

categoryModel.getProperties=function(id,result){
    pool.query(`SELECT cp.*,t.name type FROM category_properties cp inner join types t on t.id=cp.type_id
    and t.isActive=1  where cp.category_id=?;`,id||0,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


categoryModel.getPropertiesByCat=function(id,result){
    pool.query(`call getPropertiesByCat(?);`,id||0,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


categoryModel.getSubs=function(result){
    pool.query("SELECT *,date_format(created_on,'%Y-%m-%d, %h:%i:%s') created_on FROM category",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,getSubs(res,0));
        }
    });
}

function getSubs(a,id) {
    let b=[]
    a.filter(e=>e.sub==id)
    .forEach(e => {
        b.push({data:e,
        sub:getSubs(a,e.id)})
    });
    return b
}
function getSubCategory(a,id) {
    let b=[],s=""
    a.filter(e=>e.sub==id)
    .forEach(e => {
        s+=","+e.id+getSubCategory(a,e.id)
    });
    return s
}


module.exports=categoryModel;