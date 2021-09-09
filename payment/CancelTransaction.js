module.exports = CancelTransaction =async(data,javob)=>
{
    const BilingErrors = require("./BilingErrors")
    const pool = require("../database/db")

    
    pool.promise().query("SELECT *FROM transactions WHERE transaction_id=? limit 1; ",[data.params.id])
    .then(async(rest)=>
    {
       //console.log(rest)
       if(rest[0].length==0)
        return  javob.json({error:BilingErrors.TransactionNotFound()})
       else
       {    
       
         if(rest[0][0].state==1) 
         {
            const datee =new Date().getTime() ;
      
            pool.promise().query(`
               UPDATE transactions SET state= -2 ,cancel_time=? ,
               reason=? WHERE transaction_id=?;
               UPDATE orders SET state=0  WHERE  id IN  ( SELECT  
                order_id FROM transactions WHERE transaction_id=? limit 1);
              `,[datee.toString(),data.params.reason,data.params.id,data.params.id])
            .then(async(rest)=>
            {
                return javob.json({result: {
                    state : -2,
                    cancel_time : datee,
                    transaction : data.params.id
                }});
            }).catch((err) => {
                 console.log(err)
                 return  javob.json({ error: 2, error_note: "Not" });
           })

        }
        else 
        if(rest[0][0].state==2) 
         {

          
            pool.promise().query(`SELECT *FROM orders WHERE  id IN  ( SELECT  order_id
                 FROM transactions WHERE transaction_id=? limit 1);`,[data.params.id])
            .then(async(rest2)=>
            {
               if(rest2[0][0].state==3) return   javob.json({error: BilingErrors.OrderNotСanceled()})
               if(rest2[0][0].state==2) 
               {
             
                pool.promise().query(`
                   UPDATE transactions SET state= -2 ,cancel_time=? ,
                    reason=? WHERE transaction_id=?;
                   UPDATE orders SET state=-2  WHERE  id IN  ( SELECT 
                     order_id FROM transactions WHERE transaction_id=? limit 1);
                  `,[datee1.toString(),data.params.reason,data.params.id,data.params.id])
                .then(async(rest)=>
                {
                    return javob.json({result: {
                        state : -2,
                        cancel_time : datee1,
                        transaction : data.params.id
                    }});
                }).catch((err) => {
                     console.log(err)
                     return  javob.json({ error: 2, error_note: "Not" });
               })
               }
            }).catch((err) => {
                 // console.log(err)
                 return  javob.json({ error: 2, error_note: "Not" });
           })
        } 
        else
        return javob.json({result: {
            state : rest[0][0].state,
            cancel_time : parseInt(rest[0][0].cancel_time),
            transaction : data.params.id
        }});
       //  return  javob.json({ error: 2, error_note: "Not" });
     }
    }).catch((err) => {
        // console.log(err)
       return  javob.json({ error: 2, error_note: "Not" });
  })

}