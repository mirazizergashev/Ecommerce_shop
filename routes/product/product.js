const express = require("express");
const router = express.Router();
const productController=require("../../controllers/productController")

router.get('/getAll', productController.getAll);
router.get('/getSub/:id', productController.getSub);
router.post('/', productController.create_update);

router.get('/Properties/:id', productController.getProperties);
router.post('/properties', productController.productPropertiesCU);

module.exports = router;