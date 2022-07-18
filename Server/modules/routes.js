const express = require("express");
const router = express.Router();
const obj = require("./objects");
const users = require("./endpoints/users");
const com = require("./common");
const sql = require("./sql");

router.get("/ping", (req, res) => {
    res.json(objects.ok())
})
router.use("/user", users.router);
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
        const hashed = results[0]["PASSWORD"];
        com.passwords_equal(req.body.password, hashed, (results) => {
            if(results) {
                const token = com.get_jwt({
                    id: results["ID"],
                    email: results["EMAIL"]
                })
                res.send(obj.ok(token));
                return
            }
            res.json(obj.unauthorized("Invalid credentials"))
        })
    })
})

exports.router = router