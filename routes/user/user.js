const express = require("express");
const router = express.Router();

const upload = require("../../middleware/upload")
const {isAdmin,access} = require("../../middleware/auth")
const userController=require("../../controllers/userController")


router.post('/update',userController.update);
router.post('/change_user',userController.change_user);
router.post('/changePassword',userController.editPassword);
router.post('/roledit',userController.rolEdit);

router.get("/getMe",userController.getMe)
router.get("/getAllUsers",[isAdmin,access("users")],userController.getAllUsers)
router.get("/img/:url",userController.getOneImg)
router.get("/images", userController.getAllImges)
router.post("/img", upload, userController.uploadImg );
router.post("/block", userController.block);//blok qilish
router.get("/filter",[isAdmin,access("users")],userController.filter)
router.post("/rtPassword",[isAdmin],userController.resetPassword)

//##########
router.get("/tableAccess/:id",access("users"),userController.tableAccess)
router.get("/allModerator",access("users"),userController.allModerator)


module.exports = router;