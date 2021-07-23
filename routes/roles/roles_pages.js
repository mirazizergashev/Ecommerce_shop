const express = require("express");
const router = express.Router();
const schema = require('../../models/roles_pages')
const pool = require('../../database/db');

//rollarni olish user asosida
router.get('/mypages/:id', (req, res) => {
    pool.query(`SELECT rp.id,r.name role,p.name page,p.url_basic,
    rp.active FROM roles_pages rp
    inner join roles r on r.id=rp.role_id
    inner join pages p on p.id=rp.page_id where r.id=?;
    
    select ur.id,r.depart_id from users_roles ur
    inner join roles r on r.id=ur.role_id and user_id=? and role_id=?`,[req.params.id,req.session.userId,req.params.id], (err, rows, fields) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                error: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        ru: "Отклонено из-за ошибки сервера!",
                        en: "Rejected due to server error!"
                    }
                }
            })
        }
// console.log(rows)
        // bu shunchaki get
        if(rows[1].length==0)
        return res.json({
            error: {
                message: {
                    uz: "Bu rol sizga tegishli emas!",
                    ru: "Эта роль не принадлежит тебе!",
                    en: "This role does not belong to you!"
                }
            }
        })
        else{
            req.session.roleId=req.params.id
            req.session.departId=rows[1][0].depart_id
            pool.query(`SELECT * FROM shafran.users_roles where user_id=? and role_id=? limit 1;`,[req.session.userId||1,req.params.id||1],(er,fd,r1w)=>{
                req.session.urId=fd[0].id;
                // console.log(fd)
                // console.log(fd[0].id)
                // console.log(req.session.urId)
                return res.status(200).json({
                    success: {
                        data: {
                            uz: rows[0]
        
                        }
                    }
                })
            })

      
    }
    });
});

//rollarni olish user asosida
router.get('/all', (req, res) => {
    pool.query(` SELECT rp.id,r.name role,p.name page,DATE_FORMAT(rp.addtime, "%d-%m-%Y, %h:%m:%s") created_on FROM roles_pages rp
    inner join roles r on r.id=rp.role_id
    inner join pages p on p.id=rp.page_id;`, (err, rows, fields) => {
        if (err){
            console.error(err)
            return res.status(500).json({
                error: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        ru: "Отклонено из-за ошибки сервера!",
                        en: "Rejected due to server error!"
                    }
                }
            })
        }

        // bu shunchaki get
        return res.status(200).json({
            success: {
                data: {
                    uz: rows

                }
            }
        })
    });
});




router.post("/", async (req, res) => {

    //validatsiyada xatolik
    // if (req.body.active != 0) req.body.active/ = 1
    const checked = schema.roles_pages.validate(req.body);
    if (checked.error) {
        // console.log(checked.error)
        // console.log('checked.error')
        const msg=checked.error.details[0].message.split("#")
        return res.status(200).json({
            code:400,
            error: {
                message: {
                    uz:msg[0],
                    en:msg[1],
                    ru:msg[2]
                }
            }

        });
    }

    let a = req.body;
    // console.log(a);
    // pool.promise().query('select 5*5;').then()
    pool.query("call roles_pages_edit_insert(?,?,?,?);", [a.id, a.role_id, a.page_id, a.active], (err, rows, fields) => {
        if (err) {
            console.log({
                path: "/roles/pages_roles"
            })
            return res.status(500).json({
                error: {
                    message: {
                        uz: "Serverda xatolik tufayli rad etildi !",
                        ru: "Отклонено из-за ошибки сервера!",
                        en: "Rejected due to server error!"
                    }
                }
            })
        }
        // console.log(rows[0][0])
        switch (rows[0][0].natija) {
            case '1':
                res.status(201).json({
                    success: {
                        message: {
                            uz: "Rolga sahifa biriktirildi !",
                            ru: "Страница прикреплена к роли!",
                            en: "Page attached to the role!"
                        }
                    }
                })
                break;
            case '2':
                res.status(200).json({
                    success: {
                        message: {
                            uz: "Rolga va sahifaning bog'lanishi holati o'zgartirildi!",
                            ru: "Изменены статус роли и ссылки на страницу!",
                            en: "Role and page link status changed!"
                        }
                    }
                })
                break;
            case '3':
                res.status(400).json({
                    error: {
                        message: {
                            uz: "Berilgan ID ga ega sahifa mavjud emas!",
                            ru: "Там нет страницы с данным ID!",
                            en: "There is no page with the given ID!"
                        }
                    }
                })
                break;
            case '4':
                res.status(400).json({
                    error: {
                        message: {
                            uz: "Berilgan ID ga ega rol mavjud emas!",
                            ru: "Роли с данным ID нет!",
                            en: "There is no role with a given ID!"
                        }
                    }
                })
                break;
            case '5':
                res.status(400).json({
                    error: {
                        message: {
                            uz: "Ushbu rolga berilgan sahifa allaqachon biriktirilgan!",
                            ru: "Страница, назначенная этой роли, уже прикреплена",
                            en: "The page assigned to this role is already attached"
                        }
                    }
                })
                break;
            case '6':
                res.status(400).json({
                    error: {
                        message: {
                            uz: "Ushbu ID ga ega bog'lanish mavjud emas!",
                            ru: "Там нет никакой связи с этим ID!",
                            en: "There is no link with this ID!"
                        }
                    }
                })
                break;
            
            default:
                res.status(418).json({
                    error: {
                        message: {
                            uz: "Kutilmagan holat yoki server xatosi !",
                            ru: "Неожиданная ситуация или ошибка сервера!",
                            en: "Unexpected situation or server error!"
                        }
                    }
                })
                break;
        }


    })


});

module.exports = router;