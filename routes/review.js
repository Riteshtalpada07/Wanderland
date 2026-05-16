const express = require('express');
const router = express.Router({mergeParams: true});//access params from parent route using mergeParams:true
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const {reviewSchema} = require('../schema.js');
const Review = require('../models/review');
const Listing = require('../models/listing');

//validate function for review
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(errmsg, 400);
  }else {    
    next();
  }
};


 //delete route to delete a specific review by id
router.delete('/:reviewId', wrapAsync(async(req, res) => {
  const {id, reviewId} = req.params;
  await Review.findByIdAndDelete(reviewId);
  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  req.flash('success', 'review deleted!');
  res.redirect(`/listings/${id}`);
}) );

//review routes
//post route to add a new review to a specific listing
router.post('/',validateReview,wrapAsync(async(req, res) => {
  const {id} = req.params;
  const listing = await Listing.findById(id);
  const newReview = new Review(req.body.review);
   

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
req.flash('success', 'new review added successfully!');

  res.redirect(`/listings/${id}`);
} ) );


module.exports = router;