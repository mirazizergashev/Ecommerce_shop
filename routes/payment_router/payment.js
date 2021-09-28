const express = require("express");
const router = express.Router();

const paymentController=require("../../controllers/paymentController")

router.get('/all', paymentController.getAllSuccessPayment);
router.get('/getCuryer/:id', paymentController.getCuryerProd);
router.get('/getCuryerAll/', paymentController.getCuryerAll);


module.exports = router;