const pool=require("../../database/db")

module.exports = CreateTransaction =async(data,javob)=>
{
   if(!(data.params.account.order))  {
      return   javob.json({error:{
          code : -31001,
          message : 'AccessDeniet',
          data : null
      }})
}

    let order = data.params.account.order 
    const BilingErrors = require("./BilingErrors")
   
    pool.promise().query("SELECT  * FROM transactions WHERE order_id=? limit 1; "+
    "SELECT  * FROM orders WHERE id=? limit 1",
    [order,order])
    .then(async(rest)=>
    {
       if(rest[0][0].length>0)
       {
        //  console.log(rest[0])
          if(rest[0][0][0].state !== 1 ) return javob.json({error:BilingErrors.UnexpectedTransactionState()});                
          if(rest[0][0][0].transaction_id != data.params.id ) return javob.json({error:BilingErrors.OrderNotFound()});   
          if(data.params.amount)
          {  console.log("bu",rest[0][1][0].amount , data.params.amount)
              if(!(parseInt(rest[0][1][0].amount)*100=== data.params.amount)) return javob.json({error:BilingErrors.IncorrectAmount()});       
          }
          return javob.json({result: {
                       state : rest[0][0][0].state,
                       create_time : parseInt(rest[0][0][0].create_time),
                       transaction :rest[0][0][0].transaction_id
          }});
        }
       else
       {
        if(!(rest[0][1].length>0 ))
               return javob.json({error:BilingErrors.OrderNotFound()});  
        if(data.params.amount)
            { if(!(parseInt(rest[0][1][0].amount)*100===data.params.amount)){
              // console.log((parseInt(rest[0][1][0].amount)))
              // console.log("oraliq")
              // console.log(data.params.amount)
              return javob.json({error:BilingErrors.IncorrectAmount()});  
            }
            }   
        
        const datee =new Date().getTime() ;
     
        pool.promise().query(`INSERT INTO transactions(time,state,create_time,order_id,transaction_id) 
          VALUES (?,?,?,?,?)`,
          [data.params.time.toString(),1,datee.toString(),order,data.params.id])
        .then((rest)=>
        { 
              return javob.json({result: {
                       state : 1,
                       create_time : datee,
                       transaction : data.params.id
          }});

        }).catch((err) => {
           console.log(err)
           javob.json({ error: 2, error_note: "Not" });
        })
       }
    }).catch((err) => {
        console.log(err)
       javob.json({ error: 2, error_note: "Not" });
  })
    
}
