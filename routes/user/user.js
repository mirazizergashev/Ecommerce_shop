const express = require("express");
const router = express.Router();

const upload = require("../../middleware/upload")
const userController=require("../../controllers/userController")


router.post('/update',userController.update);
router.get("/img/:url",userController.getOneImg)
router.get("/images", userController.getAllImges)
router.post("/img", upload, userController.uploadImg );
router.post("/block", userController.block);//blok qilish

module.exports = router;