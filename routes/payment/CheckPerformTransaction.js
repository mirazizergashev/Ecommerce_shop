const pool=require("../../database/db")
module.exports = CheckPerformTransaction = async(data,javob)=>
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
   
    pool.promise().query("SELECT *FROM orders WHERE id=?",[order])
    .then((rest) => {
        console.log(rest[0][0])
       if(rest.length==0) return  javob.json({error: BilingErrors.OrderNotFound()})
       if(rest[0][0].state !== 0 ) return javob.json({error:BilingErrors.OrderAvailable()})
       if(parseInt(rest[0][0].amount)!== data.params.amount)
       {
           
           return javob.json({error:BilingErrors.IncorrectAmount()}) 
       }
     
       return javob.json({
            result : { 
                allow : true 
            }
        })
     }).catch((err) => {
         console.log(err)
        javob.json({ error: 2, error_note: "Not" });
   })
}


