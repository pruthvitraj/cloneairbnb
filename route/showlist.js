const express = require("express");
const Router = express.Router({ mergeParams: true })
const list = require("../new_data/schema");  
const Review = require("../new_data/review");
const accesslogin = require("../middelware");
const login = require("../new_data/login");
const Listingcontroller = require("../controllers/showlistcontroller.js");


// creating function for error handling
function asyncwrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(err => {
            console.log(err);
        })
    }
}

// show one post
Router.get("/",accesslogin, asyncwrap(Listingcontroller.showone));
// updating the post
Router.put("/",accesslogin, asyncwrap(Listingcontroller.updatepost))


Router.get("/edit", accesslogin,asyncwrap(Listingcontroller.editroute));
module.exports = Router;