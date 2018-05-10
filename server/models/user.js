const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 10;
const config = require('../config/config').get(process.env.NODE_ENV);


const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    name:{
        type:String,
        maxlength:70
    },
    lastname:{
        type:String,
        maxlength:70
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String
    }
});

userSchema.pre('save', function(next){
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_I,function(err,salt){
            if (err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }
    else{
        next();
    }
});

userSchema.methods.comparePasswords = function(candidate,cb) {
    bcrypt.compare(candidate,this.password,function (err,isMatch) {
        if(err) return cb(err);
        cb(null,isMatch);
    })
};

userSchema.methods.genToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(),config.SECRET);

    user.token = token;

    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
};

userSchema.statics.findByToken = function(token,cb) {
    var user = this;
    jwt.verify(token,config.SECRET,function (err,decoded) {
        user.findOne({"_id":decoded,"token":token},function(err,user) {
            if(err) return cb(err);
            cb(null,user);
        })
    })
};

userSchema.methods.delToken = function(token,cb) {
    var user = this;
    user.update({$unset:{token:1}},(err,user)=>{
        if(err) return cb(err);
        cb(null,user);
    })
};

const User = mongoose.model('User',userSchema);

module.exports = {User}