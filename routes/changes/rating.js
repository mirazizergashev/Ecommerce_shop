const express = require("express");
const router = express.Router();
const {authCheck}=require('../../middleware/auth');

const {mainRating,getSalesmen}=require("../../controllers/changeController")

router.get('/mainRating',mainRating);
router.get('/getSalesmen',getSalesmen);

module.exports = router;