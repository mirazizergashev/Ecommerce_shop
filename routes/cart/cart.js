const express = require("express");
const router = express.Router();
const cartController=require("../../controllers/cartController")

router.get('/getAll', cartController.getAll);

router.post('/create', cartController.create);
router.post('/update', cartController.update);

router.post('/delivered_create', cartController.delivered_create);
router.post('/delivered_update', cartController.delivered_update);


module.exports = router;