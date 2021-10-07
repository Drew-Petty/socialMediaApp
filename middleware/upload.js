

module.exports = function(req, res, next){
    try {
        upload(req,res,next)
        next()
    } catch (err) {
        res.status(400).json({msg:'image upload failed'})
    }
}