require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const obj = require("./objects")
const get_jwt = (payload) => {
    //jwt.sign(payload, process.env.JWT_KEY, {expiresIn: "60"});
    let token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: "60"});
    return token
}
const verify_jwt = (token, success = () =>{}, error = () => {}) => {
    try {
        let payload = jwt.verify(token, process.env.JWT_KEY);
        success(payload);
    } catch(err) {
        error(err);
    }
}
const jwt_middleware = (req, res, next) => {
    //Check the valid jwt from authorization header
    //Before any secured api method
    let auth = req.get("authorization")
    if(!auth) {
        res.json(obj.unauthorized());
        return;
    }
    auth = auth.split(" ")
    if(auth.length != 2 || auth[0].toLowerCase() != "bearer") {
        res.json(obj.unauthorized());
        return;
    }
    auth = auth[1]
    verify_jwt(auth, (payload) => {
        req.payload = payload;
        next();
    }, (error) => {
        res.json(obj.unauthorized());
    })
};
exports.jwt_middleware = jwt_middleware;
exports.verify_jwt = verify_jwt;
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
    firstName(text) {
        if(text.length < 1) {
            return "First name is too short";
        }
        if(text.length > 50) {
            return "First name is too long";
        }
        return true;
    }
    lastName(text) {
        if(text.length < 1) {
            return "Last name is too short";
        }
        if(text.length > 50) {
            return "Last name is too long";
        }
        return true;
    }
    email(text) {
        const valid = email_validator.validate(text);
        if(text.length > 60) {
            return "Email is too long";
        }
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