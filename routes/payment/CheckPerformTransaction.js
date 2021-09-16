const pool=require("../../database/db")
module.exports = CheckPerformTransaction = async(data,javob)=>
{
  
    if(!(data.params.account.user))  {
        return   javob.json({error:{
            code : -31060,
            message : 'AccessDeniet',
            data : null
        }})
}


    let order = data.params.account.user || data.params.account.itleader  

    const BilingErrors = require("./BilingErrors")
   
    pool.promise().query("SELECT * FROM orders WHERE id=?",[order])
    .then((rest) => {
       if(rest.length==0) return  javob.json({error: BilingErrors.OrderNotFound()})
       if(rest[0].state !== 0 ) return javob.json({error:BilingErrors.OrderAvailable()})
       if(parseInt(rest[0].amount)*100!== data.params.amount)return javob.json({error:BilingErrors.IncorrectAmount()}) 
     
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


