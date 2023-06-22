const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./img')
    },
    filename: (req,file,cb)=>{
        cb(null, Math.random() + file.originalname)
    }
  })
  const upload = multer({
    storage: storage,
  })

  module.exports = upload