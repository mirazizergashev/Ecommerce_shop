const express = require("express");
const router = express.Router();

const {smsToSalesmen}=require("../../controllers/changeController")

router.post('/smsToSalesmen',smsToSalesmen);

module.exports = router;