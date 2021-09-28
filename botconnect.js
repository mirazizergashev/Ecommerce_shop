process.env.NTBA_FIX_319=1
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN || '905487894:AAEy2Wc0n9xswLPoxgc4EGQUo1jsEBC4qcY';

//botga ulanish
const bot = new TelegramBot(token, {
  polling: true
});

function sendSms(text="yangi buyurtma") {
  
}

module.exports={bot,sendSms}