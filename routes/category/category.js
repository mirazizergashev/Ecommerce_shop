const express = require("express");
const router = express.Router();
const categoryController=require("../../controllers/categoryController")
const {authCheck}=require("../../middleware/auth")

router.get('/getAll', categoryController.getAll);
router.get('/getRegions/:id', categoryController.getRegions);
router.get('/getAllProp', categoryController.getAllProp);
router.get('/getType', categoryController.getType);
router.get('/getSub/:id', categoryController.getSub);
router.get('/getSubs', categoryController.getSubs);
router.post('/',[authCheck], categoryController.create_update);
router.get('/delete/:id',[authCheck], categoryController.delete);

router.get('/getv1PropertiesById/:id', categoryController.getv1PropertiesById);
router.get('/getPropertiesByCat/:id', categoryController.getPropertiesByCat);
router.get('/Properties/:id', categoryController.getProperties);
router.post('/properties', categoryController.categoryPropertiesCU);

module.exports = router;