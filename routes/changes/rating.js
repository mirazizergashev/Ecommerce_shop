const express = require("express");
const router = express.Router();
const {authCheck,access}=require('../../middleware/auth');

const {mainRating,getSalesmen}=require("../../controllers/changeController")

router.get('/mainRating',mainRating);
router.get('/getSalesmen',access("users"),getSalesmen);

module.exports = router;