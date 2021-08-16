const express = require("express");
const router = express.Router();
const signController=require("../../controllers/signController")
const userController=require("../../controllers/userController")


router.get("/getMe",userController.getMe)
router.get('/out', signController.signOut);
router.post("/up", signController.signUp);
router.post("/in", signController.signIn);

module.exports = router;