const express = require("express");
const router = express.Router();
const categoryController=require("../../controllers/categoryController")
const {authCheck,access}=require("../../middleware/auth")

router.get('/getAll',access("category"), categoryController.getAll);
router.get('/getRegions/:id', categoryController.getRegions);
router.get('/getAllProp',access("category_properties"), categoryController.getAllProp);
router.get('/getType', categoryController.getType);
router.get('/getSub/:id', categoryController.getSub);
router.get('/getSubs', categoryController.getSubs);
router.post('/',[authCheck], categoryController.create_update);
router.get('/delete/:id',[authCheck], categoryController.delete);

router.get('/getv1PropertiesById/:id',access("category_properties"), categoryController.getv1PropertiesById);
router.get('/getPropertiesByCat/:id',access("category_properties"), categoryController.getPropertiesByCat);
router.get('/Properties/:id',access("category_properties"), categoryController.getProperties);
router.post('/properties', categoryController.categoryPropertiesCU);

module.exports = router;