const multer = require("multer")

const uploadPath =  env.NODE_ENV === "production"
    ? `${__dirname}/../client/build/uploads/profile`
    : `${__dirname}/../client/public/uploads/profile`;

const upload = multer({
    dest: uploadPath
})

const imgMulter = upload.single(("profile"))

module.exports = imgMulter
