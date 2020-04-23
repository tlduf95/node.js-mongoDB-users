const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 10자리 솔트 생성
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 70
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 70
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})

// 정보를 DB에 넣기전에 암호화 함
userSchema.pre('save', function( next ){

    var user = this;

    if (user.isModified('password')) {

        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    }else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //플레인패스워드 123123       암호화된 비밀번호 !@#!@#@#
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {

    var user = this;

    // jsonwebtoken을 이용해 token 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

   // var token = user._id + 'secretToken' = token

   // ->

    //'secretToken' -> user._id

    user.token = token
    user.save(function(err, user) {
        if (err) return cb(err);
        cb(null, user);
    })

}

const User = mongoose.model('User', userSchema)

module.exports = { User }