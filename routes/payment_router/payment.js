const express = require("express");
const router = express.Router();

const paymentController=require("../../controllers/paymentController")

router.get('/all', paymentController.getAllSuccessPayment);
router.get('/getCuryer/:id', paymentController.getCuryerProd);
router.get('/getAllCard/:id', paymentController.getAllCard);
router.get('/getOrdersAll/', paymentController.getOrdersAll);
router.get('/getOrdersAllPostavshik', paymentController.getOrdersAllPostavshik);
router.get('/getOrdersIn/:id', paymentController.getOrdersIn);
router.get('/getOrdersAllCustomer/', paymentController.getOrdersAllCustomer);


module.exports = router;