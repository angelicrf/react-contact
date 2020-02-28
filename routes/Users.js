const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

router.post('/', [
    check('name', 'please enter a name').not().isEmpty(),
        check('email','please enter a valid email').isEmail(),
        check('password', 'please enter at least six or more characters').isLength({
            min: 6
        })

], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

 const {name, email, password} = req.body;

    try{
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg: "The user is already exist"})
        }
        user = new User({
            name, email, password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
       // res.send('user Saved');
        const payload = {
           user:{
               id: user.id
           }
       };

       jwt.sign(payload, config.get('jwtSecret'),{
          // expiresIn: 360000
       },(err, token) => {
           if(err) throw err;
           res.json({token})
       });

    }catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error....")
    }

});

module.exports = router;
