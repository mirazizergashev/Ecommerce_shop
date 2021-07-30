const express = require("express");
const router = express.Router();
const roleController=require("../../controllers/roleController")

router.get('/getAll', roleController.getAll);
router.post('/', roleController.create_update);

module.exports = router;