const express = require("express");
const router = express.Router();
const categoryController=require("../../controllers/categoryController")

router.get('/getAll', categoryController.getAll);
router.get('/getAllProp', categoryController.getAllProp);
router.get('/getType', categoryController.getType);
router.get('/getSub/:id', categoryController.getSub);
router.post('/', categoryController.create_update);

router.get('/Properties/:id', categoryController.getProperties);
router.post('/properties', categoryController.categoryPropertiesCU);

module.exports = router;