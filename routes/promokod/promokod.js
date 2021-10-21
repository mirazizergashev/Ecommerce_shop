const express = require("express");
const router = express.Router();

const {authCheck,access} = require("../../middleware/auth")
const userController=require("../../controllers/userController")
const promokodController=require("../../controllers/promokodController")


//promokodlar

router.post('/generate',authCheck,promokodController.generate)
router.get('/checkPromokod/:token',promokodController.checkPromokod)
// router.post('/attachUser',promokodController.attacheUser)
// router.post('/update',promokodController.update)

router.get('/delete/:id',[access("promokod"),authCheck],promokodController.delete)

router.get('/getAll',[access("promokod"),authCheck],promokodController.getAll)
router.get('/getBusy',[access("promokod"),authCheck],promokodController.getBusy)
router.get('/getFresh',[access("promokod"),authCheck],promokodController.getFresh)

module.exports = router;