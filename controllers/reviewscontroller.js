
const list = require("../new_data/schema");
const Review = require("../new_data/review");
const accesslogin = require("../middelware");
const login = require("../new_data/login");

module.exports.deletereview= async (req, res) => {
    let { id, rid } = req.params;
    let listing = await list.findById(id);
    await Review.findByIdAndDelete(rid);
    listing.reviews.push(_id = rid);
    req.flash("success","reviews deleted suceessfully");
    res.redirect(`/showlist/${id}`)
};

module.exports.deletelisting = async (req, res) => {
    let { id } = req.params;
    const listing = await list.findById(id);
    await list.deleteOne({ _id: listing._id }).then((res) => {
        console.log(res);
    })
    req.flash("success","listing deleted successfully");
    res.redirect(`/showlist`);
}

module.exports.newreviews = async (req, res) => {
    let {id} = req.params;
    let { rating, review } = req.body;
    let reviewData = req.body.review;
    if (!reviewData.owner) {
        reviewData.owner = [];  // Initialize owner as an empty array if it's undefined
    }
    console.log(req.user);
    
    reviewData.owner.push(req.user._id);
    console.log(reviewData.owner[0]);
    
    let newReview = new Review(reviewData);
    let listing = await list.findById(req.params.id);
    if (!listing.reviews) {
        listing.reviews = [];
    }
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","reviews created successfully");
    res.redirect(`/showlist/${id}`);

}