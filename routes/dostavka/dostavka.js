const express = require("express");
const router = express.Router();
const dostavkaController=require("../../controllers/dostavkaController")
const {authCheck,access}=require("../../middleware/auth")

router.get('/getAll',access("dostavka_type"), dostavkaController.getAll);

router.post('/',[authCheck], dostavkaController.create_update);


module.exports = router;