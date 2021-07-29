const pool = require('../database/db');

const authCheck = (req, res, next) => {
    //  session mavjud bo'lmasa ...
    console.log({session:req.session.userId,a:"------"})
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

module.exports = {
    authCheck
}