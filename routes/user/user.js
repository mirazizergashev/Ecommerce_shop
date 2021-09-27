const express = require("express");
const router = express.Router();

const upload = require("../../middleware/upload")
const userController=require("../../controllers/userController")


router.post('/update',userController.update);
router.post('/change_user',userController.change_user);
router.post('/changePassword',userController.editPassword);
router.post('/roledit',userController.rolEdit);

router.get("/getMe",userController.getMe)
router.get("/getAllUsers",userController.getAllUsers)
router.get("/img/:url",userController.getOneImg)
router.get("/images", userController.getAllImges)
router.post("/img", upload, userController.uploadImg );
router.post("/block", userController.block);//blok qilish

module.exports = router;