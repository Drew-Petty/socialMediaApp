const mongoose = require('mongoose')

const PictureSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    fileName:{
        type:String
    },
    path:{
        type:String
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = Picture = mongoose.model('picture', PictureSchema)