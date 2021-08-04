const express = require("express");
const router = express.Router();

const upload = require("../../middleware/upload")
const userController=require("../../controllers/userController")
const promokodController=require("../../controllers/promokodController")


router.post('/update',userController.update);
router.post('/changePassword',userController.editPassword);
router.post('/roledit',userController.rolEdit);

router.get("/getMe",userController.getMe)
router.get("/getAllUsers",userController.getAllUsers)
router.get("/img/:url",userController.getOneImg)
router.get("/images", userController.getAllImges)
router.post("/img", upload, userController.uploadImg );
router.post("/block", userController.block);//blok qilish

//promokodlar

router.post('/generatePromokod',promokodController.generate)

module.exports = router;