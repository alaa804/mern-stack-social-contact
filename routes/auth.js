const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const config = require('config');
const auth = require('../middilware/auth');
const  { check , validationResult } = require('express-validator')


// @route  GET api/auth
// @desc   Get a logged user
// @access private
router.get('/', auth , async (req , res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.log(error.message);
      res.status(500).send('Server Error')
    }
});

// @route  POST api/auth
// @desc  Auth user & get token
// @access Public
router.post('/', [
    check('email' , 'Please include a valide email').isEmail(),
    check('password' , 'password is required').exists()
] ,async (req , res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array() })
    }

    const {  email , password } = req.body;

    try {
        let user = await User.findOne({ email });
        
        if(!user) {
            return status(400).json({ msg : 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if(!isMatch) {
            return res.status(400).json({ msg : 'Invalid Credentials' })
        }

        const payload = { 
         user : {
             id : user.id,
         }
     }

     jwt.sign(payload , config.get('jwtSecret'), { expiresIn : 360000 },(err , token) => {
         if(err) throw err;
         res.json({ 
             _id : user.id,
             name : user.name ,
             email : user.email,
             token ,
        });
     })

    } catch (error) {
        console.error(error.message);
       res.status(500).send('Server Error');
    }
});


module.exports = router;