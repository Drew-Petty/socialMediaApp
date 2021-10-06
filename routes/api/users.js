const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator/check')
const User = require('../../models/User')



//@route    POST api/users
//@desc     Register user
//@access   Public
router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'please enter a password with 6 or more characters').isLength({
        min: 6
    }),
    check('confirmPW', 'confirmation password must match password').custom((value, {req})=>value === req.body.password)
], 
async (req,res)=>{
    console.log(req.body)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    const { name, email, password} = req.body

    try{
        // see if user exists
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({ errors: [{ msg: 'User already exists' }]})
        }
        //get users gravatar
        const avatar= gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        //make new user
        user = new User({
            name,
            email,
            password,
            avatar
        })
        //encrypt password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        //save user
        await user.save()
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

