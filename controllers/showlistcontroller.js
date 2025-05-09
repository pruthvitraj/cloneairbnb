
const list = require("../new_data/schema");
const Review = require("../new_data/review");
const accesslogin = require("../middelware");
const login = require("../new_data/login");
const Image = require("../new_data/images");

require('dotenv').config({ path: './.env' });
// console.log("Loaded ENV Variables:", process.env.KEY);

const cookieParser = require("cookie-parser");
const { log } = require("console");
// require('dotenv').config();


module.exports.showone = async (req, res) => {
    let { id } = req.params;
    const listing = await list.findById(id);
    const listingr = await list.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "owner",
                select: "username email",  // Only select necessary fields
            }
        })
        .populate({
            path: "logins",  // Populate logins
            select: "username email", // Fetch only username field
        })
         .populate({
            path: "images",  // Populate images
            select: "filename url", // Fetch only username field
        });
    let owenrli = listingr.logins[0].username;
    let reviewss = listingr.reviews || []; // Ensure it's an array
    let owenrre = (reviewss.length > 0 && reviewss[0].owner.length > 0) ? reviewss[0].owner[0] : null;
    let images  = listingr.images;
    console.log(images);
    res.render("showone.ejs", { images:images ,listing: listing, reviewss: listingr.reviews, owenrre: owenrre, owenrli: owenrli });
}

module.exports.updatepost = async (req, res) => {
    let { id } = req.params;
    await list.findByIdAndUpdate(id, { ...req.body });
    req.flash("success", "updated successfully");
    res.redirect(`/showlist/${id}`);
}
module.exports.editroute= async (req, res) => {
    let { id } = req.params;
    const listing = await list.findById(id);

    res.render("update.ejs", { listing: listing });
}

module.exports.creatinglist = async (req, res) => {
    const imageIds = (req.body.images || []).map(id => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  } else {
    throw new Error(`Invalid image ID: ${id}`);
  }
});
    console.log("📥 Files received:", req.files);

    const image = req.files['image']?.[0];     // main image
    const images = req.files['images'] || [];  // extra images

    if (!image) {
        console.error("❌ No main image received!");
        return res.status(400).send("Main image is required.");
    }

    const data = req.body;

    const newlist = new list(data);
    newlist.image = {
        url: image.path,
        filename: image.filename
    };

   for (let file of req.files['images']) {
    const newImage = new Image({
        filename: file.filename,
        url: file.path,
    });
    await newImage.save();
    newlist.images.push(newImage); // Push the image document
}

await newlist.save();

    newlist.logins.push(req.user._id);

    await newlist.save();

    req.flash("success", "List created successfully");
    res.redirect("/showlist");
}

module.exports.showalllisting = async (req, res) => {
    let alllist = await list.find({});
    console.log(res.locals.username);
    console.log(process.env.key);
    
    res.render("show.ejs", { alllist })
}
module.exports.renderformcreatinglist = (req, res) => {
    res.render("create.ejs")
};