const mongoose = require("mongoose");
const data = require("./creation_of_data");
const passportLocalMongoose = require("passport-local-mongoose");

const loginschema = new mongoose.Schema({
    username: { type: String, required: true }, // This field is required by passport-local-mongoose
    email: { type: String, required: true },
    // password: { type: String }
});
loginschema.plugin(passportLocalMongoose, { usernameField: "username" }); // ✅ Explicitly set username field
  // ✅ Adds username + hashed password

const login = mongoose.model("login", loginschema);
module.exports = login;

