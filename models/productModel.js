const e = require('express');
var pool = require('../database/db');
const { product } = require('../utils/product');

var productModel = function () { }

//maxsulot qoshish
productModel.product_edit_insert = function (data, result) {
    pool.query("call product_edit_insert(?,?,?,?,?,?,?,?,?)", data, function (err, res, field) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });

}

//admin tasdiqlashi
productModel.check_product = function (data, result) {
    pool.query("call check_product(?,?,?,?)", data, function (err, res, field) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });
}

//rasm ochirish
productModel.img_del = function (data, result) {
    pool.query("call img_del(?)", data, function (err, res, field) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });

}


//rasm yuklash
productModel.product_image = function (data, result) {
    pool.query("call product_image(?,?,?,?)", data, function (err, res, field) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });

}

productModel.getAll = function (id, ses, result) {
    let s = '';
    if (id == 3) {
        s = 'checked';
    }
    else {
        s = id
    }

    pool.query(`SELECT * FROM product where isActive=1 and checked=${s} and user_id=${ses}`, function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });
}
productModel.getTop = function (count,result) {


    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url FROM  product as p 
    left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    where p.isActive=1 and p.isTop=1 ${"limit "+(count||1000)};
    select * from category where isActive=1;`, function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            let data = changeCosts(res[1], res[0])
            return result(null, data);
        }
    });
}


productModel.changeTop = function (id,isTop,result) {


    pool.query(`update product set isTop=? where id=?`,[isTop,id], function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });
}

productModel.All = function (query,result) {

const page=parseInt(query.page||0),count=parseInt(query.count||15),user_id=parseInt(query.user_id||0)
console.log(user_id)
    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url FROM  product as p 
    left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    where p.isActive=1 ${(user_id)?`and p.user_id=${user_id} `:""} limit ?,?;
    select * from category where isActive=1;`,[page*count,count], function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            let data = changeCosts(res[1], res[0])
            return result(null, data);
        }
    });
}

productModel.getOne = function (id=0,result) {
    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url FROM  product as p 
    left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    where p.isActive=1 and p.id=?;
    select * from category where isActive=1;`,id, function (err, res) {
        if (err) {
            return result(err, null);}
            else{
            let data = changeCosts(res[1], res[0])
            return result(null, data);}
        
    });
}

productModel.searchAll = function (text,result) {

    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url FROM  product as p 
    left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    where p.isActive=1 and p.name LIKE "%${text}%";
    select * from category where isActive=1;`, function (err, res) {
        if (err) {
            return result(err, null);}
            else{
            let data = changeCosts(res[1], res[0])
            return result(null, data);
        }
    });
}

productModel.Retcomment = function (id, result) {


    pool.query(`SELECT * FROM ecommerce_shop.product_check where product_id=? order by created_on desc limit 1`, id||0, function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });
}

productModel.BigGet = function (result) {


    pool.query(`SELECT p.*,pi.id as idcha,pi.img_url,pp.cat_prop_id,pp.values FROM product p left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1) left join 
    product_properties pp on pp.product_id=p.id;select * from category where isActive=1`, function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            let data = changeCosts(res[1], res[0])
            return result(null, data);
        }
    });
}


productModel.BigGet = function (result) {


    pool.query(`SELECT p.*,pi.id as idcha,pi.img_url,pp.cat_prop_id,pp.values FROM product p left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1) left join 
    product_properties pp on pp.product_id=p.id;select * from category where isActive=1;`, function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            let data = changeCosts(res[1], res[0])
            return result(null, data);
        }
    });
}



productModel.product_properties_edit_insert = function (data, result) {
    pool.query("call product_properties_edit_insert(?,?,?,?,?)", data, function (err, res, field) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });

}

productModel.getProperties = function (id, result) {
    pool.query(`SELECT pp.*,cp.field_name pname FROM product_properties pp 
    inner join category_properties cp on pp.cat_prop_id=cp.id where pp.product_id=?;`, id || 0, function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });
}


productModel.getImage = function (id, result) {
    pool.query(`SELECT p.*,pi.id as idcha,pi.img_url FROM product p left join product_image pi on 
    pi.product_id=p.id where p.id=? and pi.isActive=1`, id || 0, function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });
}


productModel.productByCategory = function (id = 0, result) {


    pool.query(`select * from category where isActive=1`, function (err, rows) {
        if (err) {
            return result(err, null);
        } else {
            let ids = (id || 0) + "," + filterProd(id, rows)
            // if(ids.length==0)
            ids = ids.slice(0, -1)
            console.log("|" + ids + "|")

            pool.query(`SELECT p.*,pi.id as idcha,pi.img_url,pp.cat_prop_id,pp.values FROM product p left join product_image pi on pi.product_id=p.id and 
            pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1) left join 
            product_properties pp on pp.product_id=p.id where p.category_id in (${ids || null});`, function (err2, res) {
                if (err2) {
                    console.log("err2")
                    return result(err2, null);
                } else {
                    let data = changeCosts(rows, res)
                    return result(null, data);
                }
            });
        }
    });
}

productModel.prodPropsByValue = function (id = 0, result) {


    pool.query(`SELECT pp.id,pp.values,count(pp.product_id) count 
    FROM product_properties pp
    where pp.cat_prop_id=?
    group by pp.values;`, id, function (err, rows) {
        if (err) {
            return result(err, null);
        } else {
            result(null, rows)
        }
    });
}


productModel.productFilter=function(query,result){
    let a=[],ss=""
    Object.keys(query).forEach((id,i)=>{
        if(id=="fcost"||id=="lcost")return;
        let s=""
        a.push(id)
    //    for (let i = 0; i < query[id].length; i++) 
    //    if(query[id][i]=='"'){
    //     query[id][i]="'"
    //    } 
        query[id].split(" ").forEach(e=>{s+='"'+e+'",'})
        ss+=`inner join product_properties pp${i} 
        on p.id=pp${i}.product_id and pp${i}.cat_prop_id=? and pp${i}.values in (${s.slice(0,-1)})
        `
        
    })
    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url FROM  product as p left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    ${ss}
    ;select * from category;`,a,function(err,res){
        if(err){
            return result(err,null);
        }else{
            let data=changeCosts(res[1],res[0]).filter(e=>(e.cost>=(query.fcost||0)*1 && e.cost<=(query.lcost||1000000000000)*1))
            return result(null,data);
        }
    });
}

function changeCosts(c,data) {
    data.forEach((e, i) => {
        let k = e.category_id, cost = e.cost, ind = c.findIndex(x => x.id == k);

        while (ind != -1) {
                cost = parseInt(cost * (100 + c[ind].percent) / 100)+ c[ind].isFoiz
            ind = c.findIndex(x => x.id == c[ind].sub)
        }
        data[i].cost = cost*(100-data[i].discount);
    });
    return data
}


function filterProd(id, data) {

    const category = data.filter(e => e.sub == id)
    let s = ""
    category.forEach((e) => {
        s += e.id + "," + filterProd(e.id, data)
    })

    return s;
}

// console.log("data:",filterProd(5,[
//     {id:1,sub:0},
//     {id:2,sub:1},
//     {id:3,sub:2},
//     {id:4,sub:0},
//     {id:5,sub:4},
//     {id:6,sub:3}]),"|||")

// productModel.productByCategory(0,(err,result)=>{
//     if(err){
//         return console.log("last:",err)
//     }
//     console.log(result)
// })

module.exports = productModel;