const express = require('express');
let router = express.Router();
const user = require('../model/userModel');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let success="false";

// Route1: Create a user using Post /api/users/createUser
router.post('/createUser', [
    body('userName', 'Enter a valid Name').escape().isLength({min:3}).withMessage('Username must be of minimum length 5'),
    body('email', 'Enter a valid email').isEmail().normalizeEmail().withMessage('Email is not Correct'),
    body('password', 'Enter a valid password').escape().isLength({min:6}).withMessage('Minimum password length should be 3'),
] , async (req, res)=>{
    // return if there is error
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        success=false
        return res.status(400).json({success,error: errors.array()});
    }
    // check whether user is already registered or not
    try {
        let User = await user.findOne({email:req.body.email});
        if (User){
            success=false
            return res.status(400).json({success,error: [{msg: "User is already registered"}]})
        }
        // create a new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        User = await user.create({
            userName: req.body.userName,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user:{
                id: User.id,
                name: User.userName,
            }
        }

        jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true });
            res.status(201).json({ token: token, user: data });
          });
    }
    catch (error) {
        res.status(500).send("Error")}
})

// Route2: Authenticate a User using : POST "/api/users/login".
router.post('/login',[
    body('email', 'Enter a valid email').isEmail().normalizeEmail().withMessage('Email is not correct'),
    body('password', 'Password cannot be blank').escape().isLength({min:6}).withMessage('Minimum password length should be 3'),
], async (req,res) => {

    // If there are errors return the error with bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }

    const {email,password} = req.body;
    try {
        let User = await user.findOne({email});
        if(!User){
            success=false;
            return res.status(400).json({success,error:[{msg: 'Please try to login with correct credentials'}]});
        }
        
        const passCompare = await bcrypt.compare(password, User.password);
        if(!passCompare){
            success=false;
            return res.status(400).json({success,errors: [{msg: "Please try to login with correct credentials"}]})}

        const data = {
            User:{
                id:User.id,
                name: User.userName,
            }
        }
        jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true });
            res.json({ token: token, user: data });
        });

    } catch (error) {
        return res.status(500).send("Some error occured");
    }

})

module.exports = router