var userModel = require('../models/userModel');
const schema = require('../utils/user')
// const dateFormat = require('dateformat');

var userController = function () {


}


userController.index = function (req, res, next) {
    userModel.getAllEmployees(function (err, employees) {
        if (err) {
            throw err;
        } else {
            res.render('employee/index', { title: 'Employee Listing', employees: employees });
        }
    });

}

// qoshish
userController.save = function (req, res, next) {

    //validatsiyada xatolik
    const checked = schema.signup.validate(req.body);
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
    let a=req.body;
    var newUser=[
        0,
        3,
        null,
        null,
        a.tel,        
        a.parol
    ]

    userModel.user_edit_insert(newUser, function (err,result) {
        if (err) {
            console.log(err)
            // req.flash('error', 'There was error in inserting data');
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
                        code: 201,
                        error: {
                            message: {
                                uz: "Yangi foydalanuvchi yaratildi !",
                                en: "A new user has been created!",
                                ru: "Создан новый пользователь!"
                            }
                        }
                    })

                    case '2':
                    return res.status(200).json({
                        code: 203,
                        error: {
                            message: {
                                uz: "Foydalanuvchi ma'lumotlari o'zgardi !",
                                en: "User information has changed!",
                                ru: "Информация о пользователе изменилась!"
                            }
                        }
                    })

                    case '3':
                        return res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Bunday rol topilmadi!",
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
                                    uz: "Bunday telefon mavjud!",
                                    en: "Such a phone is available!",
                                    ru: "Такой телефон есть!"
                                }
                            }
                        })
                        case '5':
                        return res.status(200).json({
                            code: 400,
                            error: {
                                message: {
                                    uz: "Bunday foydalanuvchi topilmadi!",
                                    en: "No such user found!",
                                    ru: "Такого пользователя не найдено!"
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

// qoshish
userController.login = function (req, res, next) {

    //validatsiyada xatolik
    const checked = schema.signup.validate(req.body);
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
    let a=req.body;
    var newUser=[a.tel,a.parol]

    userModel.user_login(newUser, function (err,result) {
        if (err) {
            console.log(err)
            // req.flash('error', 'There was error in inserting data');
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
                case '0':
                    return res.status(200).json({
                        code: 401,
                        error: {
                            message: {
                                uz: "Telefon yoki parol xato!",
                                en: "A new user has been created!",
                                ru: "Создан новый пользователь!"
                            }
                        }
                    })

                  
               
                default:
                
                    return res.status(200).json({
                        code: 200,
                        success: {
                            message: {
                                uz: "Muvaffaqiyatli tizimga kirildi!",
                                en: "Report an unexpected error to the admin!",
                                ru: "Сообщите администратору о непредвиденной ошибке!"
                            }
                        }
                    })
                   
                 
                
              
            }
    
        }
        
    });

}



userController.employeeDetail = function (req, res) {
    var employee_id = req.body.employee_id;
    var response = {};
    userModel.getEmployeeById(employee_id, function (result) {
        if (result == null) {
            response.status = 0;
            response.data = {};
            response.message = "No employee details found";
        } else {
            response.status = 1;
            response.data = result;
            response.message = "Employee found";
        }
        res.send(JSON.stringify(response));
    })
}
userController.edit = function (req, res) {
    var employee_id = req.params.employee_id;
    userModel.getEmployeeById(employee_id, function (result) {
        if (result == null) {
            req.flash('error', 'Sorry the employee doesnot exists!!');
            res.redirect('/employee');
        } else {
            conpanyModel.getAllCompany(function (err, companies) {
                res.render('employee/edit', { title: 'Edit Employee', companies: companies, employee: result[0] });
            });
        }
    });
}
module.exports = userController;