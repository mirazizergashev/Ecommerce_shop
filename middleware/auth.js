
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
const isAdmin = (req, res, next) => {
    //  session mavjud bo'lmasa ...
    if (!req.session.userId || req.session.userId!=1 )
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
    authCheck,isAdmin
}