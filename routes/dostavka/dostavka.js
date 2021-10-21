const express = require("express");
const router = express.Router();
const dostavkaController=require("../../controllers/dostavkaController")
const {authCheck}=require("../../middleware/auth")

router.get('/getAll', dostavkaController.getAll);

router.post('/',[authCheck], dostavkaController.create_update);


module.exports = router;