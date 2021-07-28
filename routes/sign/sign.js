const express = require("express");
const router = express.Router();
const signController=require("../../controllers/signController")

router.get('/out', signController.signOut);
router.post("/up", signController.signUp);
router.post("/in", signController.signIn);

module.exports = router;