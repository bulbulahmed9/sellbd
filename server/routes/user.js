const express = require('express');
const {check} = require('express-validator');

const User = require('../controllers/user');
const validate = require('../middleware/validate');

const router = express.Router();

//INDEX
router.get('/', User.index);

//STORE
router.post('/', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
    check('name').not().isEmpty().withMessage('You name is required')
], validate, User.store);

//SHOW
router.get('/:id',  User.show);

//UPDATE
router.put('/:id',  User.update);

//DELETE
router.delete('/:id', User.destroy);

module.exports = router;