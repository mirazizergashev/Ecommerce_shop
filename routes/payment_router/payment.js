const express = require("express");
const router = express.Router();

const paymentController=require("../../controllers/paymentController")

router.get('/all', paymentController.getAllSuccessPayment);
router.get('/getCuryer/:id', paymentController.getCuryerProd);
router.get('/getOrdersAll/', paymentController.getOrdersAll);
router.get('/getOrdersAllCustomer/', paymentController.getOrdersAllCustomer);


module.exports = router;