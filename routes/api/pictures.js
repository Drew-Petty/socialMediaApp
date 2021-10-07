const express = require('express')
const path = require('path')
const router = express.Router()
const Picture = require('../../models/Picture')
const auth = require('../../middleware/auth')
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./public/uploads')
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+'-'+file.originalname)
    }
})
const upload = multer({
    storage: storage,
    limits:{fileSize: 1500000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }}).single('file')


const checkFileType= (file, cb) =>{
    const fileTypes = /jpeg|jpg|png|gif/
    const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimeType = fileTypes.test(file.mimetype)
    if(extName && mimeType){
        return cb(null,true)
    }else{
        cb('Error: Images Only')
    }
}

// @route    Post api/pictures
// @desc     upload picture
// @access   Private
router.post('/', [auth, upload], async (req, res)=>{
    if(req.file == undefined){
        return res.status(400).json({error: 'no file uploaded'})
    }
    try {
        console.log(req.file)
        const newPicture = new Picture({
            user: req.user.id,
            fileName: req.file.filename,
            path: '/uploads/'+req.file.filename
        })
        const picture = await newPicture.save()
        res.json(picture)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

// @route    GET api/pictures
// @desc     get all pictures
// @access   Private
router.get('/', auth, async (req, res)=>{
    try {
        const pictures = await Picture.find()
        res.json(pictures)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})


module.exports = router
