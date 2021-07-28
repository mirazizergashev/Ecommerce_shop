var express=require('express');
var routes= express.Router();
var controllers= require('../controllers/index');



//home page routes
// routes.get('/',(req,res)=>{res.send({msg:"server running now"})});

//company routes
// routes.get('/company',controllers.companyController.index);
// routes.get('/company/add',controllers.companyController.add);
// routes.post('/company/add',controllers.companyController.save);
// routes.get('/company/edit/(:id)',controllers.companyController.edit);
// routes.post('/company/edit/(:id)',controllers.companyController.update);

//employee routes
// routes.get('/employee',controllers.employeeController.index);
// routes.get('/employee/add',controllers.employeeController.add);
routes.post('/sign/up',controllers.userController.save);
routes.post('/sign/in',controllers.userController.login);
routes.post('/user/update',controllers.userController.update);
// routes.post('/employee/view',controllers.employeeController.employeeDetail);
// routes.get('/employee/edit/(:employee_id)',controllers.employeeController.edit);
module.exports=routes;