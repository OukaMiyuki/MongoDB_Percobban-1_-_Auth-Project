const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    try{
        let user = await User.findOne( { email: req.body.email } );
        if(!user) res.status(400).send('Invalid email or password!');
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            res.status(400).send('Invalid email or password!');
        } else{
            res.send(true);
        }
    } catch(ex){
        console.log('There\'s an error ', ex.message);
    }
});

function validate(req) {
    const schema = {
      email: Joi.string().min(10).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }

module.exports = router;