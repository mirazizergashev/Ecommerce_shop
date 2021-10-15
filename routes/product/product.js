const express = require("express");
const router = express.Router();
const upload=require('../../middleware/upload')

const productController=require("../../controllers/productController")


router.get('/:id/detail', productController.idDetail);
router.get('/statisticShop', productController.statisticShop);
router.get('/statisticShopId/:id', productController.statisticShopId);
router.get('/', productController.v1_All);
router.get('/all', productController.All);
router.get('/all2', productController.All2);
router.get('/getCommentAll/:id', productController.getCommentAll);
router.get('/changeTop/:id/:isTop', productController.changeTop);
router.get('/getTop', productController.getTop);
router.get('/search', productController.searchAll);
router.get('/Retcomment/:id', productController.Retcomment);
router.get('/getOne/:id', productController.getOne);
router.get('/productFilter', productController.productFilter);
router.get('/productByCategory', productController.productByCategory);
router.get('/prodPropsByValue', productController.prodPropsByValue);
router.get('/getAll/:id', productController.getAll);
router.get('/getImage/:id', productController.getImage);
router.post('/', productController.create_update);
router.post('/comment', productController.product_comment_edit_insert);
router.post('/check', productController.check_product);
router.post('/img_del', productController.img_del);
router.post('/image',upload, productController.product_image);

router.get('/Properties/:id', productController.getProperties);
router.post('/properties', productController.productPropertiesCU);
router.post('/dublicateProduct', productController.dublicateProduct);

module.exports = router;