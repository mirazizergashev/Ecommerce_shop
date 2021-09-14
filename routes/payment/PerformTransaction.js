module.exports = PerformTransaction =async(data,javob)=>
{

    const BilingErrors = require("./BilingErrors")
    const pool=require("../../database/db")
   
    pool.promise().query("SELECT  *FROM transactions WHERE transaction_id=? limit 1",[data.params.id])
    .then(async(rest)=>
    {
       //console.log(rest)
       if(rest[0].length==0)
             return  javob.json({error:BilingErrors.TransactionNotFound()})
       else
       {    
         if(rest[0][0].state==2)
            return javob.json({result: {
                state : rest[0][0].state,
                perform_time : parseInt(rest[0][0].perform_time),
                transaction : rest[0][0].transaction_id.toString()
            }});
         else
          if(rest[0][0].state==1) 
          {
            console.log("bu" , rest[0][0].state)

            const datee =new Date().getTime() ;
         
            pool.promise().query(`
               UPDATE transactions SET state=2,perform_time=? WHERE transaction_id=?;
               UPDATE orders SET state=2  WHERE  id IN  ( SELECT order_id FROM transactions 
                WHERE transaction_id=? limit 1);
              `,[datee.toString(),data.params.id,data.params.id])
            .then(async(rest)=>
            {  
                return javob.json({result: {
                    state : 2,
                    perform_time : datee,
                    transaction : data.params.id
                }});
               
            }).catch((err) => {
                 console.log(err)
                 return  javob.json({ error: 2, error_note: "Not" });
           })
        }
        else
        return  javob.json({error:BilingErrors.UnexpectedTransactionState()})
       }
      // console.log(rest)
      
    }).catch((err) => {
        console.log(err)
        javob.json({ error: 2, error_note: "Not" });
  })

}