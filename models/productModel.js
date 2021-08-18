const e = require('express');
var pool= require('../database/db');
const { product } = require('../utils/product');

var productModel=function(){}

productModel.product_edit_insert=function(data,result){
    pool.query("call product_edit_insert(?,?,?,?,?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

//admin tasdiqlashi
productModel.check_product=function(data,result){
    pool.query("call check_product(?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}



//rasm yuklash
productModel.product_image=function(data,result){
    pool.query("call product_image(?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

productModel.getAll=function(id,ses,result){
    let s='';
    if(id==3){
        s='checked';
    }
    else{
        s=id
    }
    
    pool.query(`SELECT * FROM product where isActive=1 and checked=${s} and user_id=${ses};select * from category;`,function(err,res){
        if(err){
            return result(err,null);
        }else{ 
            let data=changeCosts(res[1],res[0])
            console.log(data)
            return result(null,data);
        }
    });
}
productModel.All=function(result){
   
    
    pool.query(`SELECT p.*,pi.id as idcha,pi.img_url,pp.cat_prop_id,pp.values FROM product p left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1) left join 
    product_properties pp on pp.product_id=p.id;select * from category;`,function(err,res){
        if(err){
            return result(err,null);
        }else{
            let data=changeCosts(res[1],res[0])
            return result(null,data);
        }
    });
}



function changeCosts(c,data) {
   
    data.forEach((e,i) => {
        let k=e.category_id,cost=e.cost,ind=c.findIndex(x=>x.id==k);
        console.log(ind)

        while(ind!=-1){
            console.log(ind)
            if(c[ind].isFoiz)
                cost=cost*(100+c[ind].percent)/100
            else 
                cost=cost+c[ind].percent
                ind=c.findIndex(x=>x.id==c[ind].sub)            
        }
        data[i].cost=cost
    });
return data    
}

productModel.product_properties_edit_insert=function(data,result){
    pool.query("call product_properties_edit_insert(?,?,?,?,?)",data,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}

productModel.getProperties=function(id,result){
    pool.query(`SELECT cp.* FROM product_properties cp  where cp.product_id=?;`,id||0,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}


productModel.getImage=function(id,result){
    pool.query(`SELECT p.*,pi.id as idcha,pi.img_url FROM product p left join product_image pi on 
    pi.product_id=p.id where p.id=?`,id||0,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}



module.exports=productModel;