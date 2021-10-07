const express = require("express");
const router = express.Router();
const roleController=require("../../controllers/roleController")

router.get('/getAll', roleController.getAll);
router.get('/getAllStatus', roleController.getAllStatus);
router.post('/', roleController.create_update);
router.post('/status', roleController.create_update_status);

module.exports = router;