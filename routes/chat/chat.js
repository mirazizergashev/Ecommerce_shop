const express = require("express");
const router = express.Router();
const chatController=require("../../controllers/chatController")

router.get('/getChat/:id', chatController.getChatId);

router.get('/getChats', chatController.getChats);
router.get('/getMyMessage', chatController.getMyMessage);

router.post('/smsAdmin', chatController.smsAdmin);
router.post('/chatStop', chatController.chatStop);
router.post('/', chatController.send_edit);


module.exports = router;