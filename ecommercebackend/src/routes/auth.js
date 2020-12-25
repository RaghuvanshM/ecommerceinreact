const express = require('express');
const { signup, singin, requireSignin } = require('../controller/auth');
const router = express.Router();
const User = require('../modals/user')
router.post('/signin',singin)
router.post('/signup',signup)
router.post('/profile',requireSignin, (req,res)=>{
    return res.json({
        message:'passworkd'
    })
})

module.exports = router;