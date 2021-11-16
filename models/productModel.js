const e = require('express');
var pool = require('../database/db');
const { product } = require('../utils/product');

var productModel = function () { }

//:id/detail

productModel.getDetails2 = function (id,query,result) {
//select DISTINCT p.* from (select @id:=?) s,product_detail p
// `cat_prop_id=1 and `values`=42)`
let a = [id], ss = "",s0=` ,px AS (select pp.product_id from  product_properties pp  `
Object.keys(query).forEach((x0, i) => {
    if (isNaN(parseInt(x0))) return;
    
    a.push(x0*1,query[x0])
   ss+=`JOIN product_properties pp${i} on pp${i}.product_id=pp.product_id and pp${i}.cat_prop_id=? and pp${i}.values=? `
})
if(ss){
    ss=s0+ss+') '
}
a.push(id)

    pool.query(`WITH
    mp AS (SELECT p.name FROM product_properties  pp 
        
    JOIN product p ON p.id=pp.product_id where product_id=?  and p.isActive=1 and p.checked=1 )
    ${ss}
  SELECT pp.*,cp.field_name title ${ss?",(CASE WHEN px.product_id is NULL THEN 0 ELSE 1 END) hol":""} FROM product_properties pp 
  JOIN product p ON p.id=pp.product_id  and p.isActive=1 and p.checked=1 
  JOIN mp ON mp.name=p.name
  JOIN category_properties cp ON cp.id=pp.cat_prop_id
  ${ss?`LEFT JOIN px ON px.product_id=p.id`:""}
  WHERE p.color in (SELECT color FROM product WHERE id=?)
  order by pp.cat_prop_id`,
        a, function (err, res) {
            if (err) {
                console.log("err",err)
                return result(err, null);
            }
            // console.log(res)
            let cat_prop_ids=[],k=-1,data=[]
            res.forEach(e=>{
                let ind=cat_prop_ids.indexOf(e.cat_prop_id)
                if(ind==-1){
                    cat_prop_ids.push(e.cat_prop_id)
                    data.push({cat_prop_id:e.cat_prop_id,title:e.title,
                        properties:[{product_id:e.product_id,value:e.values,isActive:e.hol}]})

                }else{
                    let x=-5//=data[ind].properties.filter(el=>el.value==e.values)
                    data[ind].properties.forEach((el,i)=>{
                        if(el.value==e.values)x=i;
                    })
                    // console.log(data[ind].properties)
                    if(x==-5)
                    data[ind].properties.push({product_id:e.product_id,value:e.values,isActive:e.hol})

                    if(e.hol==1){
                        data[ind].properties[x]={product_id:e.product_id,value:e.values,isActive:e.hol}
                    }
                }
                
            })
            return result(null, data);

        });
}
productModel.idDetail = function (id, result) {

    pool.query(`SELECT * FROM  product where isActive=1 and checked=1 and id=?;
    SELECT count(s.id) as son FROM suborder s inner join orders o on s.order_id=o.id where o.state=2 and s.product_id=?;
    SELECT * FROM product_comment where product_id=?;
    SELECT img_url as img FROM  product_image where isActive=1 and product_id=?;
    SELECT cp.field_name, GROUP_CONCAT(pp.values SEPARATOR '#') as content FROM product_properties pp inner join category_properties cp on cp.id=pp.cat_prop_id where pp.product_id in 
(SELECT id FROM product where name in (SELECT name FROM product where id=?)) GROUP BY cp.field_name;
select * from category where isActive=1;`,
        [id, id, id, id, id], function (err, res) {
            // console.log(45454)
            if (err) {
                console.log("err", res[0].length)
                return result(err, null);
            }

            let  s = 0, arr2;
            let arr3, s2 = 0;
            let img = [];
            let arr4 = [], s4 = 0, cont = [], cont2 = [];

            s=res[1].son


            //nechta yulduzcha va bahosi
            res[2].forEach((e) => {
                s2 = s2 + e.mark;
            })

            //rasmlar
            res[3].forEach((e) => {
                img.push(e.img)
            })

            // brendlar
            res[4].forEach((e, i) => {
                cont = e.content.split('#')
                for (let j = 0; j < cont.length; j++) {
                    cont2.push({ 'id': j + 1, 'content': cont[j] })
                }
                arr4.push({ 'title': e.field_name, 'data': cont2 })
                cont2 = []
            })

            // console.log(parseFloat(s2 / res[2].length).toFixed(1))
            let data = changeCosts(res[5], res[0])
            let data2;
            if (res[0].length == 0) {
                data2 = "Bunday maxsulot topilmadi!"
            }
            else {


                data2 = {
                    'id': id,
                    'name': data[0].name,
                    count:data[0].count,
                    'color': data[0].color,
                    'description':data[0].comment,
                    'vendorCode': s,
                    'reviews': res[2].length,
                    'rating': isNaN(parseFloat(s2 / res[2].length).toFixed(1)) ? 0 : parseFloat(s2 / res[2].length).toFixed(1),
                    'price': data[0].cost,
                    'discount': data[0].discount,
                    'imgs': img,
                    'properties': arr4
                }
            }
            // console.log(data)
            return result(null, data2);

        });
}

//:id/detail
productModel.statisticShop = function (start, end, result) {
    if (!start) start = '2012-01-01';
    if (!end) end = '2032-01-01';
    function isDate(sDate) {  
        if(sDate.toString() == parseInt(sDate).toString()) return false; 
        var tryDate = new Date(sDate);
        return (tryDate && tryDate.toString() != "NaN" && tryDate != "Invalid Date");  
      }

    if(!(isDate(start)&&isDate(end))){
        return result(null,[]);
    }
    
    // console.log(end)
    pool.query(`SELECT p.user_id as id FROM suborder s inner join product p on s.product_id=p.id inner join orders o on 
    s.order_id=o.id where o.state=2 and 
    date(o.sana) between date('${start}') and date('${end}') group by(p.user_id);`, function (err, res) {
        if (err) {
            return result(err, null);
        }
        if(res.length==0){
            return result(null,[]);
        }

        let s = 0;
        let user = [], count = 0, daromad = 0, foyda = 0;

        //necha marta sotilgani
        res.forEach((e, i) => {
            pool.query(`SELECT u.id,concat(u.first_name," ",u.last_name) as fio,s.count,(s.cost-s.discount) as daromad,s.system_cost as foyda FROM suborder s inner join orders o on s.order_id=o.id inner join product p on s.product_id=p.id 
        inner join users u on p.user_id=u.id where u.id=? and o.state=2`, [e.id], function (err1, res1) {
              
               
                    res1.forEach((kk) => {
                        count = count + kk.count*1;
                        daromad += kk.daromad*1;
                        foyda += kk.foyda*1
                    })
                    user.push({ id: e.id, fio: res1[0].fio, count: count, daromad: daromad, foyda: foyda })
                    count = 0; daromad = 0; foyda = 0;
                    
                    if (i+1 == res.length ) {
                      
                        return result(null, user);
                    }
              

            })
        })
        // console.log(arr4)


    });
}

productModel.statisticShopId = function (start, end,id, result) {
    if (!start) start = '2012-01-01';
    if (!end) end = '2032-01-01';
    function isDate(sDate) {  
        if(sDate.toString() == parseInt(sDate).toString()) return false; 
        var tryDate = new Date(sDate);
        return (tryDate && tryDate.toString() != "NaN" && tryDate != "Invalid Date");  
      }

    if(!(isDate(start)&&isDate(end))){
        return result(null,[]);
    }

    // console.log(end)
    pool.query(`SELECT p.id as id,p.name,p.count as son FROM suborder s inner join product p on s.product_id=p.id inner join orders o on 
    s.order_id=o.id where o.state=2 and p.user_id=? and
    date(o.sana) between date('${start}') and date('${end}') group by(p.id);`,[id], function (err, res) {
        if (err) {
            return result(err, null);
        }

        if(res.length==0){
            return result(null,[]);
        }
        let s = 0;
        let user = [], count = 0, daromad = 0, foyda = 0;

        //necha marta sotilgani
        res.forEach((e, i) => {
            pool.query(`SELECT u.id,concat(u.first_name," ",u.last_name) as fio,s.count,(s.cost-s.discount) as daromad,s.system_cost as foyda FROM suborder s inner join orders o on s.order_id=o.id inner join product p on s.product_id=p.id 
        inner join users u on p.user_id=u.id where p.id=? and o.state=2`, [e.id], function (err1, res1) {
              
               
                    res1.forEach((kk) => {
                        count = count + kk.count*1;
                        daromad += kk.daromad*1;
                        foyda += kk.foyda*1
                    })
                    user.push({ id: e.id, name: e.name, sotildi: count, daromad: daromad,qoldi: e.son})
                    count = 0; daromad = 0; foyda = 0;
                    
                    if (i+1 == res.length ) {
                      
                        return result(null, user);
                    }
              

            })
        })
        // console.log(arr4)


    });
}

productModel.getCommentAll = function (id,result) {
    
    pool.query(`SELECT * FROM product_comment where status=1 and product_id=?`,id, function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });
}
//maxsulot qoshish
productModel.product_comment_edit_insert = function (data, result) {
    pool.query("call prod_comment_edit_insert(?,?,?,?,?,?)", data, function (err, res, field) {
        if (err) {
            console.log(err)
            return result(err, null);
        } else {
            // console.log(res)
            return result(null, res);
        }
    });

}
productModel.dublicate_product = function (data, result) {
    pool.query("call dublicate_product(?, ?,?);", data, function (err, res, field) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });

}



//maxsulot qoshish
productModel.product_edit_insert = function (data, result) {
    pool.query("call product_edit_insert(?,?,?,?,?,?,?,?,?,?,?)", data, function (err, res, field) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });

}

//admin tasdiqlashi
productModel.check_product = function (data, result) {
    pool.query("call check_product(?,?,?,?,?)", data, function (err, res, field) {
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
    pool.query("call product_image(?,?,?,?,?)", data, function (err, res, field) {
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

productModel.getTop = function (query, result) {


    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url FROM  product as p 
    left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    where p.isActive=1  and p.checked=1 and p.isTop=1 ${"limit " + (query.count || 1000)};
    select * from category where isActive=1;`, function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            let data = changeCosts(res[1], res[0])
            return result(null, data);
        }
    });
}

productModel.changeTop = function (id, isTop, result) {


    pool.query(`update product set isTop=? where id=?`, [isTop, id], function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });
}

productModel.All = function (query, result) {

    const page = parseInt(query.page || 0), count = parseInt(query.count || 15)
    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url,(SELECT sum(mark)/count(mark) FROM product_comment where product_id=p.id) as rating,
    (SELECT count(mark) FROM product_comment where product_id=p.id) as reviews,
    (select concat(u.first_name," ",u.last_name) from users u where u.id=p.user_id limit 1) as fish  FROM  product as p 
    left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    where p.isActive=1 and (checked=1 ${query.userId?("or p.user_id="+query.userId):""})  ${(user_id) ? `and p.user_id=${user_id} ` : ""} limit ?,?;
    select * from category where isActive=1;`, [page * count, count], function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            let data = changeCosts(res[1], res[0])
            let data1=[];
            // console.log(data)
            return result(null, data);
        }
    });
}

productModel.AllUser = function (query, result) {
  pool.query("SELECT id,sub,isActive FROM category;",
    function(err,res){
        if(err)
          { console.log("err0");
             return result(err,null);}
    const page = parseInt(query.page || 0), 
    count = parseInt(query.count || 15),
    a=[]
    a.push(page * count, count)
    let s='',cat_id=''
    if(!isNaN(query.category_id*1)){
        cat_id=' and p.category_id '+`in (${query.category_id+getSubCategory(res,query.category_id)})`
        if(query.category_id*1==0)cat_id=''
    }
    switch (query.sortBy) {
        case 'id':  s=" ORDER BY id "+(query.direction && query.direction=='DESC'?'DESC':'');  break;
        case 'name':  s=" ORDER BY name "+(query.direction && query.direction=='DESC'?'DESC':'');  break;
        case 'cost':  s=" ORDER BY cost "+(query.direction && query.direction=='DESC'?'DESC':'');  break;
        case 'rating':  s=" ORDER BY rating "+(query.direction && query.direction=='DESC'?'DESC':'');  break;
        case 'reviews':  s=" ORDER BY reviews "+(query.direction && query.direction=='DESC'?'DESC':'');  break;
        case 'discount':  s=" ORDER BY discount "+(query.direction && query.direction=='DESC'?'DESC':'');  break;
        case 'fish':  s=" ORDER BY fish "+(query.direction && query.direction=='DESC'?'DESC':'');  break;
    
        default:
            break;
    } 
    pool.query(`WITH cte AS (SELECT  p.*,pi.id as idcha,pi.img_url,
        (SELECT sum(mark)/count(mark) FROM product_comment where product_id=p.id) as rating,
        (SELECT count(mark) FROM product_comment where product_id=p.id) as reviews,
        (select concat(u.first_name," ",u.last_name) from users u where u.id=p.user_id limit 1) as fish,
        MAX(p.cost*(100-p.discount)/100) maxCost,MIN(p.cost*(100-p.discount)/100) minCost FROM  product as p 
    left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    where p.isActive=1 and checked=1 and p.count>0 ${cat_id}  group by p.name)
    select * from cte ${s}
     limit ?,?;
   
    select * from category where isActive=1;
    WITH cte AS (SELECT  p.*,pi.id as idcha,pi.img_url,
        (SELECT sum(mark)/count(mark) FROM product_comment where product_id=p.id) as rating,
        (SELECT count(mark) FROM product_comment where product_id=p.id) as reviews,
        (select concat(u.first_name," ",u.last_name) from users u where u.id=p.user_id limit 1) as fish,
        MAX(p.cost*(100-p.discount)/100) maxCost,MIN(p.cost*(100-p.discount)/100) minCost FROM  product as p 
    left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    where p.isActive=1 and checked=1 and p.count>0 ${cat_id}  group by p.name)
    select count(*) pages from cte;`, [page * count, count], function (err, res) {
        if (err) {
            return result(err, null);
        } else {

            let data = changeCosts(res[1], res[0])
            let data1=[];
            return result(null, {data,pageCount:Math.ceil(res[2][0].pages/count)});
        }
    });
});
}

productModel.AllAdmin = function (query, result) {

    const page = parseInt(query.page || 0), count = parseInt(query.count || 15)
    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url,
    (SELECT sum(mark)/count(mark) FROM product_comment where product_id=p.id) as rating,
    (SELECT count(mark) FROM product_comment where product_id=p.id) as reviews,
    (select concat(u.first_name," ",u.last_name) from users u where u.id=p.user_id limit 1) as fish,
    MAX(p.cost*(100-p.discount)/100) maxCost,MIN(p.cost*(100-p.discount)/100) minCost FROM  product as p 
left join product_image pi on pi.product_id=p.id and 
pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
where p.isActive=1 and checked!=0   group by p.name limit ?,?;
    select * from category where isActive=1;`, [page * count, count], function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            // let data = changeCosts(res[1], res[0])
            // let data1=[];
            // console.log(data)
            return result(null, res[0]);
        }
    });
}
productModel.AllSalesman = function (query, result) {
console.log(query)
    const page = parseInt(query.page || 0), count = parseInt(query.count || 15), user_id = parseInt(query.user_id || 0)
    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url,
    (SELECT sum(mark)/count(mark) FROM product_comment where product_id=p.id) as rating,
    (SELECT count(mark) FROM product_comment where product_id=p.id) as reviews,
    (select concat(u.first_name," ",u.last_name) from users u where u.id=p.user_id limit 1) as fish,
    MAX(p.cost*(100-p.discount)/100) maxCost,MIN(p.cost*(100-p.discount)/100) minCost FROM  product as p 
left join product_image pi on pi.product_id=p.id and 
pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
where p.isActive=1 and  p.user_id=? group by p.name limit ?,?;
    select * from category where isActive=1;`, [query.userId*1,page * count, count], function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            // let data = changeCosts(res[1], res[0])
            // let data1=[];
            // console.log(data)
            return result(null, res[0]);
        }
    });
}



productModel.v1_All = function (query, result) {

    const FList = ["rating", "price", "discount", "Name"]
    const page_number = parseInt(query.page_number || 0), page_size = parseInt(query.page_size || 15), user_id = parseInt(query.user_id || 0),
        filter = query.filter, category_id = parseInt(query.category_id || 15)
    if (FList.indexOf(filter) == -1)
        filter = false;

    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url FROM  product as p 
        left join product_image pi on pi.product_id=p.id and 
        pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
        where p.isActive=1 and p.checked!=${query.allow ? -1 : 0} ${(user_id) ? `and p.user_id=${user_id} ` : ""} 
        ${(category_id) ? `and p.category_id=${category_id} ` : ""} 
        ${(filter) ? `and order By ${filter} ` : ""} limit ?,?;
        select * from category where isActive=1;`, [page_number * page_size, page_size], function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            let data = changeCosts(res[1], res[0])
            return result(null, data);
        }
    });
}

productModel.getOne = function (id = 0, result) {
    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url FROM  product as p 
    left join product_image pi on pi.product_id=p.id and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    where p.isActive=1 and p.checked=1 and p.id=?;
    select * from category where isActive=1;`, id, function (err, res) {
        if (err) {
            return result(err, null);
        }
        else {
            let data = changeCosts(res[1], res[0])
            return result(null, data);
        }

    });
}

productModel.searchALLAdmin = function (text, result) {

    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url,
    (SELECT sum(mark)/count(mark) FROM product_comment where product_id=p.id) as rating,
    (SELECT count(mark) FROM product_comment where product_id=p.id) as reviews,
    (select concat(u.first_name," ",u.last_name) from users u where u.id=p.user_id limit 1) as fish,
    MAX(p.cost*(100-p.discount)/100) maxCost,MIN(p.cost*(100-p.discount)/100) minCost FROM  product as p 
left join product_image pi on pi.product_id=p.id and 
pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
where p.isActive=1 and p.checked!=0 and p.name LIKE ?  group by p.name;
select * from category`,`%${text||''}%`, function (err, res) {
        if (err) {
            return result(err, null);
        }
        else {
           // let data = changeCosts(res[1], res[0])
            return result(null, res[0]);
        }
    });
}
productModel.searchALLAdmin2 = function (text, result) {

    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url,
    (SELECT sum(mark)/count(mark) FROM product_comment where product_id=p.id) as rating,
    (SELECT count(mark) FROM product_comment where product_id=p.id) as reviews,
    (select concat(u.first_name," ",u.last_name) from users u where u.id=p.user_id limit 1) as fish 
    FROM  product as p 
left join product_image pi on pi.product_id=p.id and 
pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
where p.isActive=1 and p.checked!=0 and p.name LIKE ?;
select * from category`,`%${text||''}%`, function (err, res) {
        if (err) {
            return result(err, null);
        }
        else {
           // let data = changeCosts(res[1], res[0])
            return result(null, res[0]);
        }
    });
}
productModel.searchALLSalesman = function (query, result) {

    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url,
    (SELECT sum(mark)/count(mark) FROM product_comment where product_id=p.id) as rating,
    (SELECT count(mark) FROM product_comment where product_id=p.id) as reviews,
    (select concat(u.first_name," ",u.last_name) from users u where u.id=p.user_id limit 1) as fish,
    MAX(p.cost*(100-p.discount)/100) maxCost,MIN(p.cost*(100-p.discount)/100) minCost FROM  product as p 
left join product_image pi on pi.product_id=p.id and 
pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
where p.isActive=1 and p.user_id=? and p.name LIKE ? group by p.name;
select * from category`,[query.userId,`%${query.text||''}%`], function (err, res) {
        if (err) {
            return result(err, null);
        }
        else {
           // let data = changeCosts(res[1], res[0])
            return result(null, res[0]);
        }
    });
}
productModel.searchALLSalesman2 = function (query, result) {

    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url,
    (SELECT sum(mark)/count(mark) FROM product_comment where product_id=p.id) as rating,
    (SELECT count(mark) FROM product_comment where product_id=p.id) as reviews,
    (select concat(u.first_name," ",u.last_name) from users u where u.id=p.user_id limit 1) as fish FROM  product as p 
left join product_image pi on pi.product_id=p.id and 
pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
where p.isActive=1 and p.user_id=? and p.name LIKE ?;
select * from category`,[query.userId,`%${query.text||''}%`], function (err, res) {
        if (err) {
            return result(err, null);
        }
        else {
           // let data = changeCosts(res[1], res[0])
            return result(null, res[0]);
        }
    });
}

// `SELECT  p.*,pi.id as idcha,pi.img_url FROM  product as p 
//     left join product_image pi on pi.product_id=p.id and 
//     pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
//     where p.isActive=1 and p.checked=1 and p.name LIKE "%${text}%";
//     select * from category where isActive=1;`
productModel.searchAll = function (text, result) {

    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url,
    (SELECT sum(mark)/count(mark) FROM product_comment where product_id=p.id) as rating,
    (SELECT count(mark) FROM product_comment where product_id=p.id) as reviews,
    (select concat(u.first_name," ",u.last_name) from users u where u.id=p.user_id limit 1) as fish,
    MAX(p.cost*(100-p.discount)/100) maxCost,MIN(p.cost*(100-p.discount)/100) minCost FROM  product as p 
left join product_image pi on pi.product_id=p.id and 
pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
where p.isActive=1 and checked=1 and p.name LIKE ?  group by p.name;
select * from category`,`%${text||''}%`, function (err, res) {
        if (err) {
            return result(err, null);
        }
        else {
            let data = changeCosts(res[1], res[0])
            return result(null, data);
        }
    });
}
productModel.Retcomment = function (id, result) {


    pool.query(`SELECT * FROM product_check where product_id=? order by created_on desc limit 1`, id || 0, function (err, res) {
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
    pool.query("call product_properties_edit_insert(?,?,?,?,?,?)", data, function (err, res, field) {
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
            // console.log("|" + ids + "|")

            pool.query(`SELECT DISTINCT p.*,pi.id as idcha,pi.img_url 
            FROM product p left join product_image pi on pi.product_id=p.id and 
                        pi.img_url=(select img_url from product_image where product_id=p.id 
                        order by created_on desc limit 1) left join 
                        product_properties pp on pp.product_id=p.id where p.isActive=1 
                        and p.checked=1 and p.category_id in (${ids || null});`, function (err2, res) {
                if (err2) {
                    console.log("err2")
                    return result(err2, null);
                } else {
                    // console.log(rows[0])
                    let data = changeCosts(rows, res)
                    // console.log(data[0])
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


productModel.productFilter = function (query, result) {
    let a = [], ss = ""
    let s0='',cat_id=' where p.count>0 '
    if(!isNaN(query.category_id*1)){
        cat_id=' where p.count>0 and p.category_id='+query.category_id
        if(query.category_id*1==0)cat_id=' where p.count>0 '
    }
    switch (query.sortBy) {
        case 'id':  s0=" ORDER BY p.id "+(query.direction && query.direction=='DESC'?'DESC':'');  break;
        case 'name':  s0=" ORDER BY p.name "+(query.direction && query.direction=='DESC'?'DESC':'');  break;
        case 'cost':  s0=" ORDER BY p.cost "+(query.direction && query.direction=='DESC'?'DESC':'');  break;
        case 'count':  s0=" ORDER BY p.count "+(query.direction && query.direction=='DESC'?'DESC':'');  break;
        case 'discount':  s0=" ORDER BY p.discount "+(query.direction && query.direction=='DESC'?'DESC':'');  break;
       
        default:
            break;
    } 
    Object.keys(query).forEach((id, i) => {
        if (id == "fcost" || id == "lcost"||id=="sortBy"||id=="category_id"||id=="direction") return;
        let s = ""
        a.push(id)
        //    for (let i = 0; i < query[id].length; i++) 
        //    if(query[id][i]=='"'){
        //     query[id][i]="'"
        //    } 
        query[id].split(" ").forEach(e => { s += '"' + e + '",' })
        ss += `inner join product_properties pp${i} 
        on p.id=pp${i}.product_id and pp${i}.cat_prop_id=? and pp${i}.values in (${s.slice(0, -1)})
        `

    })
    // console.log(`SELECT  p.*,pi.id as idcha,pi.img_url FROM  product as p left join product_image pi 
    // on pi.product_id=p.id and p.isActive=1 
    // and p.checked=1 and 
    // pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    // ${ss} ${cat_id} ${s0}
    // ;select * from category where isActive=1;`)


    pool.query(`SELECT  p.*,pi.id as idcha,pi.img_url FROM  product as p left join product_image pi 
    on pi.product_id=p.id and p.isActive=1 
    and p.checked=1 and 
    pi.id=(select id from product_image where product_id=p.id order by created_on desc limit 1)
    ${ss} ${cat_id} ${s0}
    ;select * from category where isActive=1;`, a, function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            let data = changeCosts(res[1], res[0]).filter(e => (e.cost >= (query.fcost || 0) * 1 && e.cost <= (query.lcost || 1000000000000) * 1))
            return result(null, data);
        }
    });
}

function changeCosts(c, data) {
    let k,cost,ind,maxCost,minCost
    data.forEach((e, i) => {
        maxCost=e.maxCost
        minCost=e.minCost
        k = e.category_id, cost = e.cost, ind = c.findIndex(x => (x.id == k));
    //    console.log(i,k,ind)
        while (ind != -1) {
            cost = parseInt(cost * (100 + c[ind].percent * 1) / 100) + 1 * c[ind].isFoiz
            if(e.maxCost){
                maxCost= parseInt(maxCost * (100 + c[ind].percent * 1) / 100) + 1 * c[ind].isFoiz 
            }
            if(e.minCost){
                minCost= parseInt(minCost * (100 + c[ind].percent * 1) / 100) + 1 * c[ind].isFoiz 
            }
            ind = c.findIndex(x => (x.id == c[ind].sub))
    //    console.log(i,k,ind,"|")

        }
        data[i].cost = cost * (100 - data[i].discount * 1) / 100;
        if(e.minCost) data[i].minCost = minCost ;
        if(e.maxCost) data[i].maxCost = maxCost ;
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

productModel.similarProduct = function (name, result) {

    pool.query(`SELECT p.id,p.name,p.color,max(pi.img_url) img_url FROM product p 
    LEFT JOIN product_image pi ON p.id=pi.product_id 
    where name=? and p.checked=1 and p.isActive=1
    GROUP BY  p.id,p.name,p.color;`,name, function (err, res) {
        if (err) {
            return result(err, null);
        }
        else {
            
            return result(null, res);
        }
    });
}


function getSubCategory(a,id) {
    let b=[],s=""
    a.filter(e=>e.sub==id)
    .forEach(e => {
        s+=","+e.id+getSubCategory(a,e.id)
    });
    return s
}
module.exports = productModel;