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
  return bot.sendMessage("-512312710", text)
}

function sendTransOrder(trans_id) {
  pool.promise().query(`SELECT o.*,date_format(o.sana,'%Y-%m-%d, %h:%i:%s') sana FROM transactions t
inner join orders o  on o.id=t.order_id  where t.transaction_id=?;SELECT * FROM dostavka_type;`, [trans_id])
    .then(rows => {
      const k=rows[0][0][0],dostv=rows[0][1]
      console.warn({dostv})
      if(!k)return console.info("noto'g'ri trans id bot uchun...")
      let prod=eval(k.praduct_id)
      console.log(prod)
      let ss=""
      prod.forEach(e => {
        ss+=e.product_id+","
      });
      ss=ss.slice(0,-1)
      pool.query(`SELECT p.id,p.name,group_concat(pp.values separator ", ") properties 
      FROM product p left join product_properties pp 
      on pp.product_id=p.id and pp.isActive=1 where p.id in (${ss})
      group by p.id;`,(err,res)=>{
        if(err){
          return console.error({err,path:"botConnect"})
        }
        console.log(res)
        const dostvk=dostv.find(d=>d.id=k.dostavka_id)
        sendSms(`💠 Yangi buyurtma:\n🔷 Fio:${k.fish}\n`+
        `🔷 Telefon:${k.phone}\n`+
        `🔷 Manzil: ${k.viloyat+", "+k.tuman+", "+k.mfy}\n`+
        `🔷 To'lov summasi:${k.amount}\n`+
        `🔷 Dastavka turi:${dostvk?dostvk.name:"Tanlanmagan"}\n`+
        `🔷 To'lov turi: ${k.isNaqd?"Naqd pul":("Plastik karta("+k.karta+")")}\n`+
        `🔷 Vaqt:${k.sana}`).then(e=>{
            prod.forEach((e,i)=>{
              s=`💡 ${i+1}.\n🔸 Nomi:${res.find(pr=>pr.id=e.product_id).name}\n`+
        `🔸 Rangi:${res.find(pr=>pr.id=e.product_id).properties}\n`+
        `🔸 Soni:${e.count}\n`+
        `🔸 Maxsulot narxi: ${e.amount}`
        // console.log(rows[0][0])
        sendSms(s)
        })
        })
      
    
      })
    
    })
    .catch(err => console.error({
      boterror: err
    }))
}

function sendClickTrans(order_id,usul=404) {

  // bunda usul=1 bu 
  if(usul==1){
    pool.promise().query(`SELECT *,date_format(sana,'%Y-%m-%d, %h:%i:%s') sana FROM orders
    where id=?;SELECT * FROM dostavka_type;`, [order_id])
      .then(rows => {
        const k=rows[0][0][0],dostv=rows[0][1]
        console.warn({dostv})
        if(!k)return console.info("noto'g'ri trans id bot uchun...")
        let prod=eval(k.praduct_id)
        console.log(prod)
        let ss=""
        prod.forEach(e => {
          ss+=e.product_id+","
        });
        ss=ss.slice(0,-1)
        pool.query(`SELECT p.id,p.name,group_concat(pp.values separator ", ") properties 
        FROM product p left join product_properties pp 
        on pp.product_id=p.id and pp.isActive=1 where p.id in (${ss})
        group by p.id;`,(err,res)=>{
          if(err){
            return console.error({err,path:"botConnect"})
          }
          console.log(res)
          const dostvk=dostv.find(d=>d.id=k.dostavka_id)
          sendSms(`💠 Yangi buyurtma:\n🔷 Fio:${k.fish}\n`+
          `🔷 Telefon:${k.phone}\n`+
          `🔷 Manzil: ${k.viloyat+", "+k.tuman+", "+k.mfy}\n`+
          `🔷 To'lov summasi:${k.amount}\n`+
          `🔷 Dastavka turi:${dostvk?dostvk.name:"Tanlanmagan"}\n`+
          `🔷 To'lov turi: ${k.isNaqd?"Naqd pul":("Plastik karta("+k.karta+")")}\n`+
          `🔷 Vaqt:${k.sana}`).then(e=>{
              prod.forEach((e,i)=>{
                s=`💡 ${i+1}.\n🔸 Nomi:${res.find(pr=>pr.id=e.product_id).name}\n`+
          `🔸 Rangi:${res.find(pr=>pr.id=e.product_id).properties}\n`+
          `🔸 Soni:${e.count}\n`+
          `🔸 Maxsulot narxi: ${e.amount}`
          // console.log(rows[0][0])
          sendSms(s)
          })
          })
        
      
        })
      
      })
      .catch(err => console.error({
        boterror: err
      }))
  }
  
}
module.exports = {
  sendClickTrans,
  bot,
  sendSms,
  sendTransOrder
}