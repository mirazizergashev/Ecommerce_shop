const express = require("express");
const router = express.Router();
const roleController=require("../../controllers/roleController")

router.get('/getAll', roleController.getAll);

module.exports = router;