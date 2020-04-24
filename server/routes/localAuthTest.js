const passport = require('passport')
const Test = require('../model/testModel')
const router = require('express').Router()

router.post('/login' , (req,res,next)=>{
    console.log("bodyparser" ,req.body);
    passport.authenticate('local',{
        session: false
    },function(req,res,next){
        console.log(res);
    })
})

module.exports = router