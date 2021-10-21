const express = require("express");
const router = express.Router();

const {access}=require("../../middleware/auth")
const paymentController=require("../../controllers/paymentController")

router.get('/all',access("orders"), paymentController.getAllSuccessPayment);
router.get('/getCuryer/:id',access("orders"), paymentController.getCuryerProd);
router.get('/getAllCard',access("orders"), paymentController.getAllCard);
router.get('/getOrdersAll/',access("orders"), paymentController.getOrdersAll);
router.get('/getOrdersAllPostavshik',access("orders"), paymentController.getOrdersAllPostavshik);
router.get('/getOrdersIn/:id',access("orders"), paymentController.getOrdersIn);
router.get('/getOrdersAllCustomer/',access("orders"), paymentController.getOrdersAllCustomer);


module.exports = router;