const express = require("express");
const router = express.Router();
const upload=require('../../middleware/upload')

const productController=require("../../controllers/productController")

router.get('/all', productController.All);
router.get('/search', productController.searchAll);
router.get('/Retcomment/:id', productController.Retcomment);
router.get('/getOne/:id', productController.getOne);
router.get('/productFilter', productController.productFilter);
router.get('/productByCategory', productController.productByCategory);
router.get('/prodPropsByValue', productController.prodPropsByValue);
router.get('/getAll/:id', productController.getAll);
router.get('/getImage/:id', productController.getImage);
router.post('/', productController.create_update);
router.post('/check', productController.check_product);
router.post('/img_del', productController.img_del);
router.post('/image',upload, productController.product_image);

router.get('/Properties/:id', productController.getProperties);
router.post('/properties', productController.productPropertiesCU);

module.exports = router;