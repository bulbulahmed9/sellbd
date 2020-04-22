const router = require('express').Router()
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { check, validationResult } = require('express-validator')
const sendEmail = require('../utils/index')

const User = require('../model/userModel')

// sign up -> validation => check isUser already => hash password => save data => send email to verify => and send a msg : check your email to verify => if verified send back to log in page,

// @route    GET api/user/register
// @desc     sign up user
// @access   Public

router.post('/api/user/register', [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        // console.log(Math.floor(100000 + Math.random() * 900000))
            let user = await User.findOne({ email });
      
            if (user) {
              return res
                .status(400)
                .json({ errors: [{ msg: 'User already exists' }] });
            }

            const code = Math.floor(100000 + Math.random() * 900000)
            const toEmail = email
      
            user = new User({
              name,
              email,
              password,
              verificationCode: code
            });

            sendEmail(code, toEmail);
      
            const salt = await bcrypt.genSalt(10);
      
            user.password = await bcrypt.hash(password, salt);

            user.verificationCode = await bcrypt.hash(code.toString() , salt)
      
            await user.save();
      
            const payload = {
              user: {
                id: user.id
              }
            };
      
            jwt.sign(
              payload,
              `${process.env.jwtSecret}`,
              { expiresIn: 360000 },
              (err, token) => {
                if (err) throw err;
                res.json({ token });
              }
            );
    } catch (err) {
        console.log(err.message)
    }
})


// @route    put api/user/verify
// @desc     verify user
// @access   private

router.put('/api/user/verify', auth, async (req, res) => {
    try {
        const { code } = req.body;
        if(!code){
            return res.status(400).json({ msg: "Please provide a code" })
        }
        const { id } = req.user
        let user = await User.findById({ _id: id })
        if(user.isVerified){
            return res.json({ msg: "You are already verified" })
        }
        const isMatch = await bcrypt.compare(code.toString(), user.verificationCode);
        

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Code' }] });
      }
        user.isVerified = true;

        await user.save()
        res.send('verification succesful')
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router;