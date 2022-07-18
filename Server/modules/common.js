require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const get_jwt = (payload) => {
    let token = jwt.sign(payload, process.env.JWT_KEY);
    return token
}
const verify_jwt = (token) => {
    try {
        let payload = jwt.verify(token, process.env.JWT_KEY);
        return payload;
    } catch(err) {
        return err;
    }
}
exports.get_jwt = get_jwt;

const objContains = (data,fields) => {
    for(let a = 0; a < fields.length; a++) {
        const field = fields[a];
        if(!(field in data)) return field;
    }
    return true;
}

var email_validator = require("email-validator");
class Validators {
    email(text) {
        const valid = email_validator.validate(text);
        if(!valid) {
            return "Invalid email";
        }
        return true;
    }
    password(text) {
        if(text.length < 5) {
            return "Password is too short";
        }
        if(text.length > 60) {
            return "Password is too long";
        }
        return true;
    }
}

exports.hash_password = (password, callback) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            callback(hash);
        })
    })
}
exports.passwords_equal = (password, hash, callback) => {
    bcrypt.compare(password, hash, function(err, res) {
        if(res) {
            callback(true)
            return
        }
        callback(false)
    })
}

exports.Validators = new Validators();
exports.objContains = objContains;