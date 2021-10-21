const express = require("express");
const router = express.Router();
const roleController=require("../../controllers/roleController")
const {access}=require("../../middleware/auth")

router.get('/getAll',access("roles"), roleController.getAll);
router.get('/getAllStatus',access("roles"), roleController.getAllStatus);
router.post('/', roleController.create_update);
router.post('/status', roleController.create_update_status);

module.exports = router;