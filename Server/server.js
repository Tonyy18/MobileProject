const express = require("express");
const app = express()
const router = require("./modules/routes")
require("dotenv").config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", router.router);

let port = process.argv.slice(2);
if(port.length > 0) {
    port = parseInt(port[0]);
} else {
    port = process.env.PORT;
}

app.listen(port, () => {
    console.log("Listening on port " + port)
})