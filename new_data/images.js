const mongoose = require("mongoose");
const data = require("./creation_of_data");
const login = require("./login");


const imagesschema = new mongoose.Schema({
  filename: String,
  url: String
});



const images = mongoose.model("images", imagesschema);
module.exports = images;