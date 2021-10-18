
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
    if (!req.session.userId || req.session.roleId!=1 )
        return res.status(200).json({
            code:403,
            error: {
                message: "Sizga ushbu api dan foydalanishga ruxsat berilmagan !"
            }
        })

    // hozircha hamasi joyida .......
    next();
}

module.exports = {
    authCheck,isAdmin,authCheck2
}