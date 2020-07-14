const multer = require("multer")
const uploadPath = `${__dirname}/../client/build/uploads/profile`;

const upload = multer({
    dest: uploadPath
})

const imgMulter = upload.single(("profile"))

module.exports = imgMulter
