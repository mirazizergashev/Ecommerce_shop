const express = require("express");
const router = express.Router();
const {authCheck}=require('../../middleware/auth');

const {mainRating}=require("../../controllers/changeController")


router.get('/mainRating',mainRating);

module.exports = router;