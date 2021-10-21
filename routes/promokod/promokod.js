const express = require("express");
const router = express.Router();

const {authCheck,access,isAdmin} = require("../../middleware/auth")
const userController=require("../../controllers/userController")
const promokodController=require("../../controllers/promokodController")


//promokodlar

router.post('/generate',authCheck,promokodController.generate)
router.get('/checkPromokod/:token',promokodController.checkPromokod)
// router.post('/attachUser',promokodController.attacheUser)
// router.post('/update',promokodController.update)

router.get('/delete/:id',[access("promokod"),authCheck],promokodController.delete)

router.get('/getAll',[isAdmin,access("promokod")],promokodController.getAll)
router.get('/getBusy',[isAdmin,access("promokod")],promokodController.getBusy)
router.get('/getFresh',[isAdmin,access("promokod")],promokodController.getFresh)

module.exports = router;