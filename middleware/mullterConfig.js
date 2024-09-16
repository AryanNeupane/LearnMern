const multer  = require('multer')

const storage =multer.diskStorage({
    destination: function(req,file,cb){
       cb(null,'./storage') 
    },
    filename: function(req,file,cb){
        cb(null,"aryan"+file.originalname) 
     },
})

module.exports={multer,storage};