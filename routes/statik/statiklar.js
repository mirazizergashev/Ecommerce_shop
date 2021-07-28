const express = require("express");
const router = express.Router();
const schema = require('../../utils/statics')
const pool = require('../../database/db');
const upload = require("../../middleware/upload")
const path=require("path")



//rol qoshish va tahrirlash
router.post("/rol_edit_insert", async (req, res) => {
    //validatsiyada xatolik

    const checked = schema.stat.validate(req.body);
    if (checked.error) {
        let s = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: s[0],
                    en: s[1],
                    ru: s[2]
                }
            }

        });
    }
    let a = req.body;
    pool.query("call rol_edit_insert(?,?,?)", [a.id||0,a.nom, a.holat], (err, rows, fields) => {
        if (err) {
            console.error(err)
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
        switch (parseInt(rows[0][0].natija)) {
            
            case 1:
                res.status(200).json({
                    code: 400,
                    success: {
                        message: {
                            uz: "Rol yaratildi!",
                            ru: "Роль создана!",
                            en: "Role created!"
                        }
                    }
                })
                break;
                case 2:
                    res.status(200).json({
                        code: 400,
                        success: {
                            message: {
                                uz: "Rol xususiyati o'zgartirildi!",
                                ru: "Ролевая функция изменена!",
                                en: "Role feature changed!"
                            }
                        }
                    })
                    break;

            default:
                res.status(200).json({
                    code: 404,
                    error: {
                        message: {
                                uz: "Bunday rol topilmadi!",
                                en: "No such role found!",
                                ru: "Такого role не найдено!"
                            }
                    }
                })
                break;
        }
    })
});

//tip qoshish va tahrirlash
router.post("/type_edit_insert", async (req, res) => {
    //validatsiyada xatolik

    const checked = schema.stat.validate(req.body);
    if (checked.error) {
        let s = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: s[0],
                    en: s[1],
                    ru: s[2]
                }
            }

        });
    }
    let a = req.body;
    pool.query("call type_edit_insert(?,?,?)", [a.id,a.nom, a.holat], (err, rows, fields) => {
        if (err) {
            console.error(err)
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
        switch (parseInt(rows[0][0].natija)) {
            
            case 1:
                res.status(200).json({
                    code: 400,
                    success: {
                        message: {
                            uz: "Tip yaratildi!",
                            ru: "Type создана!",
                            en: "Type created!"
                        }
                    }
                })
                break;
                case 2:
                    res.status(200).json({
                        code: 400,
                        success: {
                            message: {
                                uz: "Tip xususiyati o'zgartirildi!",
                                ru: "Typevoy функция изменена!",
                                en: "Type feature changed!"
                            }
                        }
                    })
                    break;

            default:
                res.status(200).json({
                    code: 404,
                    error: {
                        message: {
                                uz: "Bunday tip topilmadi!",
                                en: "No such type found!",
                                ru: "Такого type не найдено!"
                            }
                    }
                })
                break;
        }
    })
});

//status qoshish va tahrirlash
router.post("/status_edit_insert", async (req, res) => {
    //validatsiyada xatolik

    const checked = schema.stat.validate(req.body);
    if (checked.error) {
        let s = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: s[0],
                    en: s[1],
                    ru: s[2]
                }
            }

        });
    }
    let a = req.body;
    pool.query("call status_edit_insert(?,?,?)", [a.id,a.nom, a.holat], (err, rows, fields) => {
        if (err) {
            console.error(err)
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
        switch (parseInt(rows[0][0].natija)) {
            
            case 1:
                res.status(200).json({
                    code: 400,
                    success: {
                        message: {
                            uz: "Status yaratildi!",
                            ru: "Status создана!",
                            en: "Status created!"
                        }
                    }
                })
                break;
                case 2:
                    res.status(200).json({
                        code: 400,
                        success: {
                            message: {
                                uz: "Status xususiyati o'zgartirildi!",
                                ru: "Status функция изменена!",
                                en: "Status feature changed!"
                            }
                        }
                    })
                    break;

            default:
                res.status(200).json({
                    code: 404,
                    error: {
                        message: {
                                uz: "Bunday Status topilmadi!",
                                en: "No such Status found!",
                                ru: "Такого Status не найдено!"
                            }
                    }
                })
                break;
        }
    })
});

//Tag qoshish va tahrirlash
router.post("/tag_edit_insert", async (req, res) => {
    //validatsiyada xatolik

    const checked = schema.stat.validate(req.body);
    if (checked.error) {
        let s = checked.error.details[0].message.split("#")
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: s[0],
                    en: s[1],
                    ru: s[2]
                }
            }

        });
    }
    let a = req.body;
    pool.query("call tag_edit_insert(?,?,?)", [a.id,a.nom, a.holat], (err, rows, fields) => {
        if (err) {
            console.error(err)
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
        switch (parseInt(rows[0][0].natija)) {
            
            case 1:
                res.status(200).json({
                    code: 400,
                    success: {
                        message: {
                            uz: "Teg yaratildi!",
                            ru: "Teg создана!",
                            en: "Teg created!"
                        }
                    }
                })
                break;
                case 2:
                    res.status(200).json({
                        code: 400,
                        success: {
                            message: {
                                uz: "Teg xususiyati o'zgartirildi!",
                                ru: "Teg функция изменена!",
                                en: "Teg feature changed!"
                            }
                        }
                    })
                    break;

            default:
                res.status(200).json({
                    code: 404,
                    error: {
                        message: {
                                uz: "Bunday Teg topilmadi!",
                                en: "No such Teg found!",
                                ru: "Такого Teg не найдено!"
                            }
                    }
                })
                break;
        }
    })
});

module.exports = router;