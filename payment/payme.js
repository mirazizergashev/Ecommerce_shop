const express = require("express");
const app = express();
const pool = require("../database/db")
const CheckPerformTransaction = require("./CheckPerformTransaction")
const CreateTransaction= require("./CreateTransaction")
const CheckTransaction =require("./CheckTransaction")
const PerformTransaction =require("./PerformTransaction")
const CancelTransaction = require("./CancelTransaction")
const check = require("../middleware/auth").authCheck
const merchant ="5fe1defc52312934ea44557e"

//tekshrish 
function checkAuth(auth) {
     return auth &&
            (buff=Buffer.from(auth.split(" ")[1], 'base64'))  &&
            (str=buff.toString('utf-8')) &&
            str.split(":")[1]=='9aofZh5Eka?vqMZgx8N&bTHxG?%X&XRZ%TnJ';
}

// payme etab 1
app.use("/payme/1", [check] , async (req, res) => {
 
    req.body = req.query
   
    await pool.promise()
    .query("insert into orders (user_id , amount , payme_state , state , phone ,sana,praduct_id) "+ 
    "values (?,?,0,0,?,GETDATE(),?) ; SELECT max(id) as id FROM orders "+
    "WHERE user_id=? ",[req.userId,req.body.amount,req.body.phone,req.body.praduct_id,req.userId])
     .then(async(rest) => {
        bu=Buffer.from(`m=${merchant};ac.user=${rest[0][0].id};a=${req.body.amount*100}`).toString('base64')
        console.log(bu)
        res.redirect(`https://checkout.paycom.uz/${bu}`) ;
     }).catch((err) => {
         res.json({ error: 2, error_note: "Not" });
     })  
})

// payme etab 2
app.use("/payme/2", async (req, res) => {
        data =req.body
        console.log(data)

        if(!(data && data.id))  {
            return   res.json({error:{
                code : -32504,
                message : 'AccessDeniet',
                data : null
            }})
    }   

   
    if( !checkAuth(req.headers['authorization']) ) {
        return res.json({error: {
            code : -32504,
            message : 'AccessDeniet',
            data : null
        }})
    }


      
        switch(data.method)
        {
            case "CheckPerformTransaction": 
                  CheckPerformTransaction(req.body,res);
                  break ;
            case "CreateTransaction": 
                   CreateTransaction(req.body,res);
                   break ; 
           case "CheckTransaction": 
                   CheckTransaction(req.body,res);
                   break ;      
            case "PerformTransaction": 
                   PerformTransaction(req.body,res);
                   break ;  
            case "CancelTransaction": 
                   CancelTransaction(req.body,res);
                   break ;  
            default :
               res.json({ "error": {
                       code :"-0001",
                       message :"Not Method "
               }})   
                break ; 
        }

})

module.exports = app; 