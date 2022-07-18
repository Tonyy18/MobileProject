const express = require("express");
const router = express.Router();
const sql = require("../sql");
const com = require("../common");
const obj = require("../objects");
router.post("/", (req, res) => {
    //Registering a user
    const contains = com.objContains(req.body, ["email", "password"]);
    if(contains !== true) {
        res.json(obj.bad_request(contains + " was missing"));
        return;
    }
    pass_valid = com.Validators.password(req.body.password);
    if(pass_valid !== true) {
        res.json(obj.bad_request(pass_valid));
        return;
    }
    email_valid = com.Validators.email(req.body.email);
    if(email_valid !== true) {
        res.json(obj.bad_request(email_valid));
        return;
    }
    const email_used = sql.query("select id from users where email='" + req.body.email + "'", function(results) {
        if(results.length > 0) {
            res.json(obj.bad_request("Email is already taken"));
            return;
        }
        com.hash_password(req.body.password, (hash) => {
            sql.query("insert into users(email,password) values('" + req.body.email + "', '" + hash + "')", function(results) {
                res.json(obj.created());
            })
        })
    });
})
exports.router = router;