const express = require("express");
const router = express.Router();
const upload=require('../../middleware/upload')
const {access,authCheck2, isAdmin}=require('../../middleware/auth');


const productController=require("../../controllers/productController")


router.get('/:id/detail',access("product"), productController.idDetail);
router.get('/statisticShop',access("product"), productController.statisticShop);
router.get('/statisticShopId/:id', productController.statisticShopId);
router.get('/',access("product"), productController.v1_All);
router.get('/AllUser', productController.AllUser);
router.get('/AllSalesman',authCheck2, productController.AllSalesman);
router.get('/AllAdmin',[isAdmin,access("product")], productController.AllAdmin);
router.get('/getCommentAll/:id',access("product"), productController.getCommentAll);
router.get('/changeTop/:id/:isTop',access("product"), productController.changeTop);
router.get('/getTop', productController.getTop);
router.get('/searchALL', productController.searchAll);
router.get('/searchALLAdmin',[isAdmin,access("product")], productController.searchALLAdmin);
router.get('/searchALLSalesman',authCheck2, productController.searchALLSalesman);
router.get('/Retcomment/:id',access("product"), productController.Retcomment);
router.get('/getOne/:id',access("product"), productController.getOne);
router.get('/productFilter',access("product"), productController.productFilter);
router.get('/productByCategory',access("product"), productController.productByCategory);
router.get('/prodPropsByValue',access("product"), productController.prodPropsByValue);
router.get('/getAll/:id', productController.getAll);
router.get('/getImage/:id', productController.getImage);
router.post('/', productController.create_update);
router.post('/comment', productController.product_comment_edit_insert);
router.post('/check', productController.check_product);
router.post('/img_del', productController.img_del);
router.post('/image',upload, productController.product_image);

router.get('/getDetails2/:id', productController.getDetails2);
router.get('/Properties/:id', productController.getProperties);
router.post('/properties', productController.productPropertiesCU);
router.post('/dublicateProduct', productController.dublicateProduct);

module.exports = router;