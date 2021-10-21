const pool=require("../database/db")


const authCheck = (req, res, next) => {
    //  session mavjud bo'lmasa ...
    if (!req.session.userId)
        return res.status(200).json({
            code:404,
            error: {
                message: "Iltimos shaxsiy kabinetingizga kiring !"
            }
        })

    // hozircha hamasi joyida .......
    next();
}
const authCheck2 = (req, res, next) => {
    //  session mavjud bo'lmasa ...
    if (!req.session.userId || req.session.roleId!=4)
        return res.status(200).json({
            code:404,
            error: {
                message: "Iltimos shaxsiy kabinetingizga kiring !"
            }
        })

    // hozircha hamasi joyida .......
    next();
}
const isAdmin = (req, res, next) => {
    //  session mavjud bo'lmasa ...
    if (!req.session.userId || (req.session.roleId!=1 && req.session.roleId!=2))
        return res.status(200).json({
            code:403,
            error: {
                message: "Sizga ushbu api dan foydalanishga ruxsat berilmagan !"
            }
        })

    // hozircha hamasi joyida .......
    next();
}


function access(s0) {
    // if(req.session.userId){
       return async (req, res, next) => {
        //  session mavjud bo'lmasa ...
        if (!req.session.userId || req.session.roleId!=2) return next()
        const acc=await pool.promise()
        .query("select readable(?, (select eco.get_name(?))) access",[req.session.userId,s0])
        if (acc[0][0].access=='1') next()
        else
        
          return  res.status(200).json({
                code: 403,
                error: {
                    message: {
                        uz: "Sizga bu ma'lumotlardan foydalanishga ruxsat berilmagan",
                        ru: "Вам не разрешено использовать эту информацию",
                        en: "You are not allowed to use this information"
                    }
                }
            })
    
    
      
    }
    // }else next()
}
module.exports = {
    authCheck,isAdmin,authCheck2,access
}