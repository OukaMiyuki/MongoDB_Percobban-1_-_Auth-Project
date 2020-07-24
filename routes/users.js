const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    try{
        let user = await User.findOne( { email: req.body.email } );
        if(user) res.status(400).send('Email or user has already been registered!');

        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        user = await user.save();
        res.send(_.pick(user, ['_id','name', 'email']));
    } catch(ex){
        console.log('There\'s an error ', ex.message);
        //res.status(400).send('An error occured', ex.message);
    }
});

module.exports = router;