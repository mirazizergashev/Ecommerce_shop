// payme etab 1
app.use("/payme/1", async (req, res) => {
        
})

// payme etab 2
app.use("/payme/2", async (req, res) => {
        data =req.body
        console.log(data)
        let id = data.id;
        let params= data.params 
 
        // let  PAYCOM_PASSWORD = '3305e3bab097f420a62ced01';  

        const pool = require("../database/db")
        if(data.method=="CheckPerformTransaction"){
                //user bormi yo'qmi tekshrish      
             
                let user = data.params.account.user || data.params.account.itleader || 0 ; 
             
                pool.promise().query("SELECT *FROM tolov_payme where id=?",[user]).then((rest) => {
                    if(rest.length>0) 
                       return res.json({"result" :{ 
                        "allow" : true 
                       }});
                }).catch((err) => {
                    // console.log(err)
                    res.json({ error: "Xatolik "  })
                })
            } 
        
        if(data.method=="CreateTransaction"){
                // Transaction yaratish 
                 //to'lov id si  .
                 const transaction = data.params.id;
                 let user = data.params.account.user || data.params.account.itleader || 0 ; 
               
                 pool.promise().query("SELECT *FROM tolov_payme where paycom_transaction_id=?",
                 [transaction]).then((rest) => {
                     try { 
                        rest=rest[0]
                     }
                     catch { 
                        //    code 
                       }
                    if(rest.length!=0){
                          return res.json({ result:{
                                state : rest[0].state,
                                create_time : parseInt(rest[0].create_time),
                                transaction :transaction.toString()
                               }});
                     } 
                 else 
                   {
                      const tdata = {
                        time: params.time,
                        state : 1,               
                        create_time : new Date().getTime(),
                        perform_time : 0,         
                        cancel_time : 0,
                        transaction : transaction ,
                        id : user,
                        reason: null
                    };

               
                
                    pool.promise().query(`UPDATE tolov_payme   SET
                                   paycom_time=? ,
                                   state=1 ,
                                   create_time=?,
                                   paycom_transaction_id=?
                                   WHERE id=?`,
                                   [tdata.time.toString(),tdata.create_time.toString(),tdata.transaction,user] ).then((rest) => {
                                     return res.json({ result:{
                                        state : tdata.state,
                                        create_time : parseInt(tdata.create_time),
                                        transaction : transaction
                                     }});
                                   }).catch((err) => {
                                        //console.log(err)
                                        res.json({ error: "Xatolik "  })
                                    })
                    }
                      }).catch((err) => {
                       console.log(err) 
                       return  res.json({ error: "Xatolik "  })
                 })

            }

           
            if(data.method=="CheckTransaction"){
               
               pool.promise().query("SELECT *FROM tolov_payme where paycom_transaction_id=?",[params.id]).then((rest) => {
                 
                    let cdata =rest[0]
                    //console.log(cdata)
                    return res.json({ "result": {
                        state : cdata.state,
                        create_time : parseInt(cdata.create_time),
                        perform_time : cdata.perform_time || 0,
                        cancel_time: cdata.cancel_time || 0,
                        transaction : cdata.paycom_transaction_id,
                        reason: cdata.reason
                    }});
                }).catch((err) => {
                   // console.log(err)
                    res.json({ error: "Xatolik "  })
                })
              
            }


})