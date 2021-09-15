module.exports = CheckTransaction =async(data,javob)=>
{
    const BilingErrors = require("./BilingErrors")
    const pool=require("../../database/db")
    
   
  
    pool.promise().query("SELECT * FROM transactions WHERE transaction_id=? limit 1",[data.params.id])
    .then(async(rest)=>
    {
       console.log(rest[0])
       if(rest[0].length==0)
        return  javob.json({error:BilingErrors.TransactionNotFound})
       else
        return javob.json({result:{
         state : rest[0][0].state,
         create_time : parseInt(rest[0][0].create_time),
         perform_time : parseInt(rest[0][0].perform_time) || 0,
         cancel_time:  parseInt(rest[0][0].cancel_time) || 0,
         transaction : rest[0][0].transaction_id.toString(),
         reason: parseInt(rest[0][0].reason)
       }});
    }).catch((err) => {
        // console.log(err)
        javob.json({ error: 2, error_note: "Not" });
  })

}