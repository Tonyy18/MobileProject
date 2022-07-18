const express = require("express");
const router = express.Router();
const sql = require("../sql");
const com = require("../common");
const obj = require("../objects");
router.get("/test", (req, res) => {
    res.json(req.payload)
})
exports.router = router;