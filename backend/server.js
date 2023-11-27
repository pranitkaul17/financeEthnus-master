require('dotenv').config(); //Better to place this on the first line itself 
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
console.log(process.env.API_KEY); //This is how you can get access to the environment variables 
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");

app.get("/", (req, res) => {
    res.render("App.js");
})

app.listen(3000, () => {
    console.log("listening on port 3000");
});