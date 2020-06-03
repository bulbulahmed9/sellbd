const multer = require('multer');

const storage  = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, './uploads/')
    // },
    filename: function(req, file, callback){
        callback(null, Date.now() + file.originalname)
    }
})

const imageFilter = function(req, file, cb){
    // accept img files only
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
        return cb(new Error('Only image files are accepted'), false);
    }
    cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: imageFilter })

module.exports = upload