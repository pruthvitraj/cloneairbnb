const express = require("express");
const accesslogin = require("../middelware");
const Router = express.Router({mergeParams:true})
const list = require("../new_data/schema");  // ✅ Import List model
const Review = require("../new_data/review");
const session = require("express-session");
const Reviewcontroller = require("../controllers/reviewscontroller.js");

function asyncwrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(err => {
            console.log(err);
        })
    }
}

//delete reviews 
Router.delete("/deletereview/:rid", accesslogin,asyncwrap(Reviewcontroller.deletereview));

//delete the listing
Router.delete("/delete",accesslogin,asyncwrap(Reviewcontroller.deletelisting));

Router.post("/reviews", accesslogin,asyncwrap(Reviewcontroller.newreviews));
module.exports = Router;