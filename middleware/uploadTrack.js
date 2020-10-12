const multer = require("multer")
const uploadPath = `${__dirname}/../client/build/uploads/tracks`;
console.log(`${__dirname}/../client/build/uploads/tracks`)

const upload = multer({
    dest: uploadPath
})

module.exports = upload.single(("file"))