const express = require("express");
const router = express.Router();

const {authCheck} = require("../../middleware/auth")
const userController=require("../../controllers/userController")
const promokodController=require("../../controllers/promokodController")


//promokodlar

router.post('/generate',authCheck,promokodController.generate)
router.get('/checkPromokod/:token',promokodController.checkPromokod)
// router.post('/attachUser',promokodController.attacheUser)
// router.post('/update',promokodController.update)

router.get('/delete/:id',authCheck,promokodController.delete)

router.get('/getAll',authCheck,promokodController.getAll)
router.get('/getBusy',authCheck,promokodController.getBusy)
router.get('/getFresh',authCheck,promokodController.getFresh)

module.exports = router;