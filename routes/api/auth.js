const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator/check')
const auth = require('../../middleware/auth')

const User = require('../../models/User')

//@route    GET api/auth
//@desc     Test route
//@access   Public
router.get('/', auth, async(req,res)=>{
    try{
        const user =await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }
})
//@route    POST api/auth
//@desc     Authenticate User and get token
//@access   Public
router.post('/',[
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'please enter your password').exists()
], 
async (req,res)=>{
    console.log(req.body)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    const { email, password} = req.body

    try{
        // see if user exists
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]})
        }

        //return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 60*60*4},
            (err, token)=>{
                if(err) throw err
                res.json({ token })
            })
    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }
})

module.exports = router