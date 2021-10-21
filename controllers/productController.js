const pool = require('../database/db');
var productModel = require('../models/productModel');
const schema = require('../utils/product')

var productController = {}

productController.idDetail = function (req, res) {
    productModel.idDetail(req.params.id, (err, rows) => {
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


        // console.log(rows)
        res.status(200).json(rows)
    })
}

productController.statisticShop = function (req, res) {
    productModel.statisticShop(req.query.start,req.query.end,(err, rows) => {
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


        
        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}

productController.statisticShopId = function (req, res) {
    productModel.statisticShopId(req.query.start,req.query.end,req.params.id,(err, rows) => {
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


        
        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}

productController.getCommentAll = function (req, res) {
    productModel.getCommentAll(req.params.id, (err, rows) => {

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



        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}

productController.product_comment_edit_insert = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.product_comment.validate(req.body);
    if (checked.error) {
        const msg = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: msg[0],
                    en: msg[1],
                    ru: msg[2]
                }
            }

        });
    }
    let a = req.body;
    console.log(req.session)
    var data = [
        a.id,
        a.prod_id,
        a.izoh,
        a.baho,
        a.name,
        a.hol
    ]

    productModel.product_comment_edit_insert(data, function (err, result) {
        if (err) {
            console.log(err)
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
        } else {
            // req.flash('success', 'Employee added succesfully');
            console.log(result[0][0].natija)
            switch (result[0][0].natija) {
                case '1':
                    return res.status(200).json({
                        code: 201,
                        success: {
                            message: {
                                uz: "Yangi izoh yaratildi!",
                                en: "New product created!",
                                ru: "Создан новый продукт!"
                            }
                        }
                    })

                case '2':
                    return res.status(200).json({
                        code: 203,
                        success: {
                            message: {
                                uz: "izoh o'zgartirildi !",
                                en: "Product changed!",
                                ru: "Товар изменен!"
                            }
                        }
                    })


                case '3':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Foydalanuvchi topilmadi!",
                                en: "No such role found!",
                                ru: "Такой роли не найдено!"
                            }
                        }
                    })

                    case '4':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Maxsulot topilmadi!",
                                en: "No such role found!",
                                ru: "Такой роли не найдено!"
                            }
                        }
                    })


                default:

                    return res.status(200).json({
                        code: 418,
                        success: {
                            message: {
                                uz: "Kutilmagan xatolik adminga xabar bering !",
                                en: "Report an unexpected error to the admin!",
                                ru: "Сообщите администратору о непредвиденной ошибке!"
                            }
                        }
                    })




            }

        }

    });

}

productController.create_update = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.product.validate(req.body);
    if (checked.error) {
        const msg = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: msg[0],
                    en: msg[1],
                    ru: msg[2]
                }
            }

        });
    }    
    let a = req.body; 
    var data = [
        a.id,
        a.nom,
        a.izoh,
        a.narx,
        a.son,
        req.session.userId || 0,
        a.hol,
        a.kategoriya,
        a.skidka,
        a.color
    ]
    // console.log(a.properties)
    pool.query(`SELECT  * FROM category where isActive=1;
    SELECT id,field_name,type_id,category_id FROM category_properties WHERE isActive=1;`,
    (err,row)=>{
        if (err) {
            console.log(err)
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
        if(!a.id|| a.id==0){
            // console.log(row[0])
            let pp=getCatProperties(row[0],row[1],a.kategoriya||-2),pp0=[]
            var myproperties=[]
            pp.forEach(prop=>{
                let pv=a.properties.find(e=>e.cat_prop_id==prop.id)
                if(!pv)
                pp0.push(prop)
                else
                myproperties.push(pv)
            })
            // console.log({pp0,properties:a.properties})
            if (pp0.length>0) {
                return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Maxsulotning kategoriyalariga mos maxsulotlar kiritilishi majburiy!",
                                en: "Rejected due to server error!",
                                ru: "Отклонено из-за ошибки сервера!"
                            },
                            data:pp0
                        }
                })
            }
        }
        productModel.product_edit_insert(data,async function (err, result) {
            if (err) {
                console.log(err)
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
            } else {
                // req.flash('success', 'Employee added succesfully');
                // console.log(result)
                switch (result[0][0].natija) {
                    case '1':
                        if(myproperties.length>0){
                            let s="INSERT INTO product_properties(product_id,cat_prop_id,`values`) VALUES",ka=[]
                            myproperties.forEach(e=>{
                                s+=`(${result[0][0].id},${e.cat_prop_id*1},?),`
                                ka.push(e.value||"")
                            })
                            s=s.slice(0,-1)
                            console.log({s,ka})
                            await pool.promise().query(s,ka).then(rows=>{
                               
                                return res.status(200).json({
                                    code: 201,
                                    success: {
                                        message: {
                                            uz: "Yangi maxsulot yaratildi!",
                                            en: "New product created!",
                                            ru: "Создан новый продукт!"
                                        }
                                    }
                                })
                            })
                            .catch(err2=>{
                                    console.log({err2})
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
                                
                            })
                        }
                        else
                        return res.status(200).json({
                            code: 201,
                            success: {
                                message: {
                                    uz: "Yangi maxsulot yaratildi!",
                                    en: "New product created!",
                                    ru: "Создан новый продукт!"
                                }
                            }
                        })
                        break;
                    case '2':
                        return res.status(200).json({
                            code: 203,
                            success: {
                                message: {
                                    uz: "Maxsulot o'zgartirildi !",
                                    en: "Product changed!",
                                    ru: "Товар изменен!"
                                }
                            }
                        })
                    break

                    case '3':
                        return res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Foydalanuvchi topilmadi!",
                                    en: "No such role found!",
                                    ru: "Такой роли не найдено!"
                                }
                            }
                        })


                        case '6':
                            return res.status(200).json({
                                code: 400,
                                error: {
                                    message: {
                                        uz: "Kategoriya topilmadi!",
                                        en: "No such role found!",
                                        ru: "Такой роли не найдено!"
                                    }
                                }
                            })
    
    
                        default:

                        return res.status(200).json({
                            code: 418,
                            success: {
                                message: {
                                    uz: "Kutilmagan xatolik adminga xabar bering !",
                                    en: "Report an unexpected error to the admin!",
                                    ru: "Сообщите администратору о непредвиденной ошибке!"
                                }
                            }
                        })




                }

            }

        });

    })
}

function getCatProperties(cat=[],prop=[],catId=-1) {
    let arr=[],pp=[...prop]
    arr=pp.filter(e=>e.category_id==catId)//.map(e=>e.id)
    // console.log({cat})
    let cts=cat.find(e=>e.id==catId)
    if(!cts) cts={sub:-8}
    const category = cat.find(e => e.id == cts.sub)
   if(category)
        getCatProperties(cat,prop,category.id).forEach(e=>{arr.push(e)})
return arr
}
//admin tasdiqlashi
productController.check_product = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.check_product.validate(req.body);
    if (checked.error) {
        const msg = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: msg[0],
                    en: msg[1],
                    ru: msg[2]
                }
            }

        });
    }
    let a = req.body;
    var data = [
        a.product_id,
        a.hol,
        req.session.userId || 0,
        a.izoh,
        req.session.userId
    ]

    productModel.check_product(data, function (err, result) {
        if (err) {
            console.log(err)
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
        } else {
            // req.flash('success', 'Employee added succesfully');
            switch (parseInt(result[0][0].natija)) {
                case 0:
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Maxsulot rad etildi!",
                                en: "Product Rejected!",
                                ru: "Товар отклонен!"
                            }
                        }
                    })
                    case 403:
                        res.status(200).json({
                            code: 403,
                            error: {
                                message: {
                                    uz: "Sizga bu ma'lumotlardan foydalanishga ruxsat berilmagan",
                                    ru: "Вам не разрешено использовать эту информацию",
                                    en: "You are not allowed to use this information"
                                }
                            }
                        })
                        break;

                case 1:
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Maxsulot qabul qilindi!",
                                en: "Product accepted!",
                                ru: "Товар принят!"
                            }
                        }
                    })

                case 2:
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Maxsulot qabul qilindi!",
                                en: "Product accepted!",
                                ru: "Товар принят!"
                            }
                        }
                    })


                case 3:
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Maxsulot topilmadi!",
                                en: "No such product found!",
                                ru: "Такой product не найдено!"
                            }
                        }
                    })


                default:

                    return res.status(200).json({
                        code: 418,
                        error: {
                            message: {
                                uz: "Kutilmagan xatolik adminga xabar bering !",
                                en: "Report an unexpected error to the admin!",
                                ru: "Сообщите администратору о непредвиденной ошибке!"
                            }
                        }
                    })




            }

        }

    });

}

//admin tasdiqlashi
productController.img_del = function (req, res) {


    let a = req.body;
    var data = [
        a.rasm
    ]

    productModel.img_del(data, function (err, result) {
        if (err) {
            console.log(err)
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
        } else {
            // req.flash('success', 'Employee added succesfully');
            switch (parseInt(result[0][0].natija)) {
                case 0:

                case 1:
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Rasm ochirildi!",
                                en: "Product accepted!",
                                ru: "Товар принят!"
                            }
                        }
                    })


                case 2:
                    return res.status(200).json({
                        code: 400,
                        success: {
                            message: {
                                uz: "Rasm topilmadi!",
                                en: "No such product found!",
                                ru: "Такой product не найдено!"
                            }
                        }
                    })


                default:

                    return res.status(200).json({
                        code: 418,
                        error: {
                            message: {
                                uz: "Kutilmagan xatolik adminga xabar bering !",
                                en: "Report an unexpected error to the admin!",
                                ru: "Сообщите администратору о непредвиденной ошибке!"
                            }
                        }
                    })




            }

        }

    });

}


//rasm yuklash
productController.product_image = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.product_image.validate(req.body);
    if (checked.error) {
        const msg = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: msg[0],
                    en: msg[1],
                    ru: msg[2]
                }
            }

        });
    }
    let a = req.body;
    var data = [
        a.id,
        a.product_id,
        req.linkFile,
        a.hol
    ]

    productModel.product_image(data, function (err, result) {
        if (err) {
            console.log(err)
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
        } else {
            // req.flash('success', 'Employee added succesfully');
            switch (parseInt(result[0][0].natija)) {

                case 1:
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Rasm qabul qilindi!",
                                en: "Image accepted!",
                                ru: "KaptuHka принят!"
                            }
                        }
                    })


                case 2:
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Rasm holati o`zgardi!",
                                en: "Picture status has changed!",
                                ru: "Статус изображения изменился!"
                            }
                        }
                    })


                default:

                    return res.status(200).json({
                        code: 404,
                        error: {
                            message: {
                                uz: "Maxsulot topilmadi!",
                                en: "No product found!",
                                ru: "Товар не найден!"
                            }
                        }
                    })




            }

        }

    });

}

productController.getAll = function (req, res) {
    productModel.getAll(req.params.id, req.session.userId, (err, rows) => {

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



        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}


productController.getTop = function (req, res) {
    if (req.session.roleId == 4) req.query.allow = 1
    else req.query.allow = 0
    productModel.getTop(req.query, (err, rows) => {
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



        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}



productController.changeTop = function (req, res) {
    productModel.changeTop(req.params.id, req.params.isTop, (err, rows) => {

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



        res.status(200).json({
            code: 203,
            success: {
                message: {
                    uz: "Muvaffaqiyatli o'zgartirildi !",
                    en: "Rejected due to server error!",
                    ru: "Отклонено из-за ошибки сервера!"
                }
            }
        })
    })
}
productController.All = function (req, res) {
    if (req.session.roleId == 4) req.query.allow = 1
    else req.query.allow = 0

    productModel.All(req.query, (err, rows) => {


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


        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}



productController.v1_All = function (req, res) {
    if (req.session.roleId == 4) req.query.allow = 1
    else req.query.allow = 0

    productModel.v1_All(req.query, (err, rows) => {


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


        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}


productController.AllSalesman = function (req, res) {
    req.query.userId=req.session.userId
    productModel.AllSalesman(req.query, (err, rows) => {


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


        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}

productController.AllAdmin = function (req, res) {
    productModel.AllAdmin(req.query, (err, rows) => {
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


        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}

productController.AllUser = function (req, res) {
    productModel.AllUser(req.query, (err, rows) => {

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


        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}
productController.getOne = function (req, res) {
    productModel.getOne(req.params.id, (err, rows) => {
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


        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}

productController.searchAll = function (req, res) {
    productModel.searchAll(req.query.text, (err, rows) => {


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


        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}
productController.searchALLSalesman = function (req, res) {
    req.query.userId=req.session.userId
    productModel.searchALLSalesman(req.query, (err, rows) => {


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


        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}
productController.searchALLAdmin = function (req, res) {
    productModel.searchALLAdmin(req.query.text, (err, rows) => {


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


        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}
productController.Retcomment = function (req, res) {
    productModel.Retcomment(req.params.id, (err, rows) => {


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


        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}


productController.productFilter = function (req, res) {
    productModel.productFilter(req.query, (err, rows) => {
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


        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}


//xususiyatlar

productController.productPropertiesCU = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.product_properties.validate(req.body);
    if (checked.error) {
        const msg = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: msg[0],
                    en: msg[1],
                    ru: msg[2]
                }
            }

        });
    }
    let a = req.body;
    var data = [
        a.id,
        a.product_id,
        a.cat_prop_id,
        a.qiymat,
        a.hol
    ]

    productModel.product_properties_edit_insert(data, function (err, result) {
        if (err) {
            console.log(err)
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
        } else {
            // req.flash('success', 'Employee added succesfully');
            switch (result[0][0].natija) {
                case '1':
                    return res.status(200).json({
                        code: 203,
                        success: {
                            message: {
                                uz: "Maxsulot xusuiyati saqlandi!",
                                en: "Product feature saved!",
                                ru: "Функция продукта сохранена!"
                            }
                        }
                    })

                case '2':
                    return res.status(200).json({
                        code: 203,
                        success: {
                            message: {
                                uz: "Maxsulot xusuiyati o'zgartirildi !",
                                en: "Product feature changed!",
                                ru: "Характеристики продукта изменены!"
                            }
                        }
                    })

                case '3':
                    return res.status(200).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Maxsulot topilmadi!",
                                en: "No product found!",
                                ru: "Товар не найден!"
                            }
                        }
                    })
                    case '4':
                        return res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Kategoriya xususiyati topilmadi!",
                                    en: "Category feature not found!",
                                    ru: "Функция категории не найдена!"
                                }
                            }
                        })
    
                        case '400':
                            return res.status(200).json({
                                code: 400,
                                error: {
                                    message: {
                                        uz: "Kategoriya xususiyati topilmadi!",
                                        en: "Category feature not found!",
                                        ru: "Функция категории не найдена!"
                                    }
                                }
                            })
        
            
                default:

                    return res.status(200).json({
                        code: 418,
                        success: {
                            message: {
                                uz: "Kutilmagan xatolik adminga xabar bering !",
                                en: "Report an unexpected error to the admin!",
                                ru: "Сообщите администратору о непредвиденной ошибке!"
                            }
                        }
                    })




            }

        }

    });

}


productController.getProperties = function (req, res) {
    productModel.getProperties(req.params.id, (err, rows) => {
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

        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}

productController.getImage = function (req, res) {
    productModel.getImage(req.params.id, (err, rows) => {
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

        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}


productController.productByCategory = function (req, res) {
    productModel.productByCategory(req.query.id, (err, rows) => {


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


        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}

productController.prodPropsByValue = function (req, res) {
    productModel.prodPropsByValue(req.query.id, (err, rows) => {


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


        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}

productController.dublicateProduct = function (req, res) {

    //validatsiyada xatolik
    const checked = schema.dublicate_product.validate(req.body);
    if (checked.error) {
        const msg = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: msg[0],
                    en: msg[1],
                    ru: msg[2]
                }
            }

        });
    }    
    let a = req.body; 
    var data = [
        a.product_id,
        a.cat_prop_id,
        a.value
    ]
    
           
        productModel.dublicate_product(data,function (err, result) {
            if (err) {
                console.log(err)
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
               
            switch (result[0][0].natija) {
                    case '1':
                        
                        return res.status(200).json({
                            code: 201,
                            success: {
                                message: {
                                    uz: "Yangi maxsulot yaratildi!",
                                    en: "New product created!",
                                    ru: "Создан новый продукт!"
                                },
                                product_id:result[0][0].id
                            }
                        })
                        break;
                    case '2':
                        return res.status(200).json({
                            code: 203,
                            success: {
                                message: {
                                    uz: "Maxsulot o'zgartirildi !",
                                    en: "Product changed!",
                                    ru: "Товар изменен!"
                                }
                            }
                        })
                    break

                    case '3':
                        return res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Bunday kategoriya xususiyati mavjud emas!",
                                    en: "No such role found!",
                                    ru: "Такой роли не найдено!"
                                }
                            }
                        })


                        case '4':
                            return res.status(200).json({
                                code: 400,
                                error: {
                                    message: {
                                        uz: "Bunday ID ga ega maxsulot mavjud emas!",
                                        en: "No such role found!",
                                        ru: "Такой роли не найдено!"
                                    }
                                }
                            })
    
    
                        default:

                        return res.status(200).json({
                            code: 418,
                            success: {
                                message: {
                                    uz: "Kutilmagan xatolik adminga xabar bering !",
                                    en: "Report an unexpected error to the admin!",
                                    ru: "Сообщите администратору о непредвиденной ошибке!"
                                }
                            }
                        })




            }

        });

}


productController.getDetails2= function (req, res) {
    productModel.getDetails2(req.params.id,req.query, (err, rows) => {
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

        res.status(200).json({
            code: 200,
            success: rows
        })
    })
}

module.exports = productController;