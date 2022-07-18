const express = require("express");
const router = express.Router();
const obj = require("./objects");
const users = require("./endpoints/users");
const com = require("./common");
const sql = require("./sql");

router.post("/authenticate", (req, res) => {
    //Login
    const contains = com.objContains(req.body, ["email", "password"]);
    if(contains !== true) {
        res.json(obj.unauthorized("Invalid credentials"))
        return;
    }
    sql.query("select * from users where email='" + req.body.email + "'", (results) => {
        if(results.length == 0) {
            res.json(obj.unauthorized("Invalid credentials"))
            return;
        }
        results = results[0]
        const hashed = results["PASSWORD"];
        com.passwords_equal(req.body.password, hashed, (equals) => {
            if(equals) {
                //Creating jwt
                const token = com.get_jwt({
                    id: results["ID"],
                    email: results["EMAIL"]
                })
                res.json(obj.ok(token));
                return
            }
            res.json(obj.unauthorized("Invalid credentials"))
        })
    })
})
router.post("/users",  (req, res) => {
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
    sql.query("select id from users where email='" + req.body.email + "'", function(results) {
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
});
router.use(com.jwt_middleware); //Secured endpoints has to be specified after setting the jwt middleware
router.get("/ping", (req, res) => {
    res.json(obj.ok())
})
router.use("/users", users.router);

exports.router = router