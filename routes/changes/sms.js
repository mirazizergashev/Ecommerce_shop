const express = require("express");
const router = express.Router();
const {authCheck}=require('../../middleware/auth');

const {smsToSalesmen,getDostavka}=require("../../controllers/changeController")


router.get('/getDostavka',getDostavka);
router.post('/smsToSalesmen',authCheck,smsToSalesmen);

module.exports = router;