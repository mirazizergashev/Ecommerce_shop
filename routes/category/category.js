const express = require("express");
const router = express.Router();
const categoryController=require("../../controllers/categoryController")

router.get('/getAll', categoryController.getAll);
router.get('/getSub/:id', categoryController.getSub);
router.post('/', categoryController.create_update);

module.exports = router;