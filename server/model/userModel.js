const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config()

const Token = require('./tokenModel')


// User Schema
const userSchema = new mongoose.Schema({
    OauthId: String,
    logByOauth: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    provider: String,
    name: {
        type: String,
        required: true
    },
    fbEmail: {
        type: String,
        trim: true,
    },
    googleEmail: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,
        trim: true,
        default: null
    },
    resetPasswordToken: {
        type: String,
    },

    resetPasswordExpires: {
        type: Date,
    }
}, { timestamps: true })


userSchema.pre('save',  function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);


    let payload = {
        id: this._id,
        name: this.name,
        email: this.email,
        phone: this.phone
    };

    return jwt.sign(payload, process.env.jwtSecret, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

userSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

userSchema.methods.generateVerificationToken = function() {
    let payload = {
        userId: this._id,
        token: crypto.randomBytes(20).toString('hex')
    };

    return new Token(payload);
};


module.exports = mongoose.model('User', userSchema)