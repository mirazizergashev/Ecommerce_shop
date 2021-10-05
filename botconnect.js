process.env.NTBA_FIX_319 = 1

const pool = require("./database/db")
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN || '2003490237:AAFTBAuD2h17gqvtvZmy8cbxBwMTeYkuJiA';
//botga ulanish
const bot = new TelegramBot(token, {
  polling: true
});
// bot.on("message",msg=>console.log(msg.chat))
function sendSms(text = "yangi buyurtma") {
  return bot.sendMessage("-512312710", text,{
    parse_mode:"HTML"
  })
}

function sendTransOrder(trans_id) {
  pool.promise().query(`SELECT o.*,date_format(o.sana,'%Y-%m-%d, %h:%i:%s') sana FROM transactions t
inner join orders o  on o.id=t.order_id  where t.transaction_id=?;SELECT * FROM dostavka_type;`, [trans_id])
    .then(rows => {
      const k = rows[0][0][0], dostv = rows[0][1]
      if (!k) return console.info("noto'g'ri trans id bot uchun...")

      pool.query(`SELECT p.id,concat(u.first_name," ",u.last_name) fish,p.name,so.cost narx,so.discount,
      group_concat(pp.values separator ", ") properties 
            FROM product p left join product_properties pp 
            on pp.product_id=p.id and pp.isActive=1 
            left join users u on u.id=p.user_id 
            inner join suborder so on p.id=so.product_id and so.order_id=?
            group by p.id;`,k.order_id,(err,res)=>{
        if(err){
          return console.error({err,path:"botConnect"})
        }
        console.log(res)
        const dostvk=dostv.find(d=>d.id=k.dostavka_id)
        sendSms(`💠 Yangi buyurtma:\n\n`+
        `🔷 Fio:${k.fish}\n`+
        `🔷 Telefon:${k.phone}\n`+
        `🔷 Manzil: ${k.viloyat+", "+k.tuman+", "+k.mfy}\n`+
        `🔷 To'lov summasi:${k.amount}\n`+
        `🔷 Chegirma summasi:${k.discount}\n`+
        `🔷 Dastavka turi:${dostvk?dostvk.name:"Tanlanmagan"}\n`+
        `🔷 To'lov turi: ${k.isNaqd?"Naqd pul":("Plastik karta("+k.karta+")")}\n`+
        `🔷 Vaqt:${k.sana}`).then(e=>{
            res.forEach((e,i)=>{
              s=`💡 ${i+1}.\n`+
              `🔸 Vendor kod:${e.id}\n`+
              `🔸 Nomi:${e.name}\n`+
        `🔸 Rangi:${e.properties}\n`+
        `🔸 Soni:${e.count}\n`+
        `🔸 Maxsulot narxi: ${e.narx}\n`+
        `🔸 Maxsulot uchun chegirma: ${e.discount}\n`+
        `🔸 Dostavkachi: ${e.fish}`
        sendSms(s)
        })
        })
  
      })
     
    })
    .catch(err => console.error({
      boterror: err
    }))
}
sendClickTrans(101)
function sendClickTrans(order_id) {
  pool.promise().query(`SELECT *,date_format(sana,'%Y-%m-%d, %h:%i:%s') sana FROM orders
  where id=?;SELECT * FROM dostavka_type;`, [order_id])
    .then(rows => {
      const k=rows[0][0][0],dostv=rows[0][1]
      console.warn({dostv})
      if(!k)return console.info("noto'g'ri trans id bot uchun...")
    
      pool.query(`SELECT p.id,concat(u.first_name," ",u.last_name) fish,p.name,so.count,so.cost narx,so.discount,
      group_concat(pp.values separator ", ") properties 
            FROM product p left join product_properties pp 
            on pp.product_id=p.id and pp.isActive=1 
            left join users u on u.id=p.user_id 
            inner join suborder so on p.id=so.product_id and so.order_id=?
            group by p.id;`,order_id,(err,res)=>{
        if(err){
          return console.error({err,path:"botConnect"})
        }
        console.log(res)
        const dostvk=dostv.find(d=>d.id=k.dostavka_id)
        sendSms(`<b>💠 Yangi buyurtma:</b>\n\n`+
        `🔷 Fio:<b>${k.fish} </b>\n`+
        `🔷 Telefon:<b>${k.phone} </b>\n`+
        `🔷 Manzil: <b>${k.viloyat+", "+k.tuman+", "+k.mfy} </b>n`+
        `🔷 To'lov summasi:<b>${k.amount} </b>\n`+
        `🔷 Chegirma summasi:<b>${k.discount} </b>\n`+
        `🔷 Dastavka turi:<b>${dostvk?dostvk.name:"Tanlanmagan"} </b>\n`+
        `🔷 To'lov turi: <b>${k.isNaqd?"Naqd pul":("Plastik karta("+(k.karta||'')+")")} </b>\n`+
        `🔷 Vaqt:<b>${k.sana} </b>`).then(e=>{
            res.forEach((e,i)=>{
              s=`💡 ${i+1}.\n`+
              `🔸 Vendor kod:<b>${e.id} </b>\n`+
              `🔸 Nomi:<b>${e.name} </b>\n`+
        `🔸 Xususiyatlari: <b>[${e.properties||""}] </b>\n`+
        `🔸 Soni:<b>${e.count} </b>\n`+
        `🔸 Maxsulot narxi: <b>${e.narx} </b>\n`+
        `🔸 Maxsulot uchun chegirma: <b>${e.discount} </b>\n`+
        `🔸 Dostavkachi: <b>${e.fish} </b>`
        // console.log(rows[0][0])
        sendSms(s)
        })
        })
        .catch(err=>console.error("bot",err))
  
      })
      .catch(err => console.error({
        boterror: err
      }))
  })
  
}

// sendTransOrder("61546715568512a0eddff948")
// sendClickTrans(93)
module.exports = {
  sendClickTrans,
  bot,
  sendSms,
  sendTransOrder
}