const sha256 = require("sha256")
const path = require("path")

const upload = (req, res, next) => {

    console.log(req.body)
    console.log(req.files)
    let fileName = sha256((new Date() + Math.random()).toString())

    if (!req.files || !req.files.file) {
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: "Kechirasiz fayl mavjud emas !",
                    ru: "Извините, файл не существует!",
                    en: "Sorry the file does not exist !"
                }
            }
        })
    }

    let sampleFile = req.files.file;
    if (sampleFile.size > 4 * 1024 * 1024)
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: "Kechrasiz bu faylni hajmi juda katta !.",
                    ru: "Извините, этот файл слишком велик.",
                    en: "Sorry, this file is too large."
                }
            }
        })
    let mimi = req.files.file.mimetype.split("/");
    console.log(mimi)

    if ((mimi[0] == 'video') || (mimi[0] == 'image')) {

        const ext = req.files.file.name.split('.');
        fileName = fileName + '.' + ext[ext.length - 1]

        sampleFile.mv(path.join(__dirname, `../public/upload/products/${fileName}`),
            async (err) => {
                if (err) {
                    console.log(err)
                    return res.status(403).json({
                        code: 400,
                        error: {
                            message: {
                                uz: "Kechrasiz bu faylni yuklab bo'lmadi!.",
                                ru: "Извините, этот файл не может быть загружен.",
                                en: "Sorry, this file could not be downloaded."
                            }
                        }
                    })
                }
                req.linkFile = fileName;
                next()
            })
    }
    else{
        return res.status(200).json({
            code: 400,
            error: {
                message: {
                    uz: "Kechirasiz bu faylni yuklash mumkin emas !.",
                    ru: "Извините, этот файл не может быть загружен.",
                    en: "Sorry, this file cannot be uploaded."
                }
            }
        })
    }




}

module.exports = upload;