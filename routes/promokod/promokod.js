const express = require("express");
const router = express.Router();

const upload = require("../../middleware/upload")
const userController=require("../../controllers/userController")
const promokodController=require("../../controllers/promokodController")


//promokodlar

router.post('/generate',promokodController.generate)
router.get('/checkPromokod/:token',promokodController.checkPromokod)
// router.post('/attachUser',promokodController.attacheUser)
// router.post('/update',promokodController.update)

router.get('/delete/:id',promokodController.delete)

router.get('/getAll',promokodController.getAll)
router.get('/getBusy',promokodController.getBusy)
router.get('/getFresh',promokodController.getFresh)

module.exports = router;