const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
      return res.json({ errors: errors.array() });
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
      res.json({
        msg: "Something went wrong"
      })
    }
  })


// @route    put api/user/verify
// @desc     verify user
// @access   private

router.put('/api/user/verify', async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email) {
      return res.json({
        msg: "Please provide your email"
      })
    }
    if (!code) {
      return res.json({
        msg: "Please provide a code"
      })
    }
    let user = await User.findOne({ email: email })

    if (!user) {
      return res.json({
        msg: 'User not found'
      })
    }
    if (user.isVerified) {
      return res.json({ msg: "You are already verified" })
    }
    const isMatch = await bcrypt.compare(code.toString(), user.verificationCode);


    if (!isMatch) {
      return res.json({
        msg: 'Invalid Code'
      });
    }
    user.isVerified = true;

    await user.save()
    const payload = {
      user: {
        id: user.id
      }
    };
    const token = jwt.sign({
      payload
    }, process.env.jwtSecret, { expiresIn: '7d' });
    res.status(201).json({
      token,
      msg: "Verification Successful"
    })
  } catch (err) {
    res.json({
      msg: "Something went wrong"
    })
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
      return res.json({ errors: errors.array() });
    }
    try {
      let { email, password } = req.body
      let user = await User.findOne({ email })
      if (!user) {
        return res.json({
          msg: "User not exists"
        })
      }
      if (!user.isVerified) {
        return res.json({
          msg: 'You are not verified user'
        })
      }
      const isMatchPasswod = await bcrypt.compare(password, user.password)
      if (!isMatchPasswod) {
        return res.json({
          msg: "Invalid Credentials"
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
      res.status(201).json({
        token,
        msg: 'You are logged in'
      });
    } catch (err) {
      res.json({
        msg: "Something went wrong"
      })
    }

  })

module.exports = router;