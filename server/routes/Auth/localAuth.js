const router = require('express').Router()
const bcrypt = require('bcrypt')
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { check, validationResult } = require('express-validator')
const sendEmail = require('../../utils/index')

const User = require('../../model/userModel')

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
      return res.status(200).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      
      if (user && user.isVerified === false) {
        const code = Math.floor(100000 + Math.random() * 900000)
        const toEmail = email
        const salt = await bcrypt.genSalt(10);
        let newCode = await bcrypt.hash(code.toString(), salt)
        user.verificationCode = newCode
        await user.save()
        sendEmail(code, toEmail);
        return res.status(201).json({
          email: user.email,
          msg: "You are already registered, check your email for new verification code"
        })
      }

      if (user) {
        return res
          .status(200)
          .json({
            msg: 'User already exists'
          });
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

      user.verificationCode = await bcrypt.hash(code.toString(), salt)

      await user.save();

      res.status(201).json({
        email,
        msg: 'Please check your email and verify your account'
      })
    } catch (err) {
      console.log(err.message)
    }
  })


// @route    put api/user/verify
// @desc     verify user
// @access   private

router.put('/api/user/verify', async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email) {
      return res.status(200).json({
        success: false,
        msg: "Please provide your email"
      })
    }
    if (!code) {
      return res.status(200).json({
        success: false,
        msg: "Please provide a code"
      })
    }
    let user = await User.findOne({ email: email })

    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      })
    }
    if (user.isVerified) {
      return res.json({ msg: "You are already verified" })
    }
    const isMatch = await bcrypt.compare(code.toString(), user.verificationCode);


    if (!isMatch) {
      return res.json({
          success: false,
          msg: 'Invalid Code'
        });
    }
    user.isVerified = true;

    await user.save()
    res.status(201).json({
      success: true,
      msg: "Verification Successful. Please log in"
    })
  } catch (err) {
    console.log(err.message)
  }
})


// @route    post api/user/login
// @desc     log in user
// @access   public

router.post('/api/user/login',
  [
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
    try {
      let { email, password } = req.body
      console.log(email, password)
      let user = await User.findOne({ email })
      if (!user) {
        return res.send('User not exists')
      }
      if (!user.isVerified) {
        return res.json({
          success: false,
          msg: 'User not verified'
        })
      }
      const isMatchPasswod = await bcrypt.compare(password, user.password)
      if (!isMatchPasswod) {
        return res.json({
          success: false,
          msg: "Password doesn't match"
        })
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      const token = jwt.sign({
        payload
      }, process.env.jwtSecret, { expiresIn: '7d' });
      res.json({
        token,
        msg: 'Login success'
      });
    } catch (err) {
      console.log(err.message);
    }

  })

// @route    get /api/user/logout
// @desc     log in user
// @access   public

// router.get('/api/user/logout', (req, res) => {
//   res.clearCookie('mycookie')
//   res.json({
//     success: true,
//     msg: 'Successfully logged out'
//   })
// })


module.exports = router;