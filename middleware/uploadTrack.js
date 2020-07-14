const multer = require("multer")

//here was hard coded to the local and the dirname works for anyone's computer 
const uploadPath = env.NODE_ENV === "production" 
    ? `${__dirname}/../client/build/uploads/tracks`
    : `${__dirname}/../client/public/uploads/tracks`;

const upload = multer({
    dest: uploadPath
})

module.exports = upload.single(("file"))
