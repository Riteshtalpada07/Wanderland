const express = require('express');
const router = express.Router({mergeParams: true});//access params from parent route using mergeParams:true
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const Review = require('../models/review');
const Listing = require('../models/listing');
const { isLoggedIn,validateReview, isReviewAuthor } = require('../middleware.js');

const reviewController = require('../controllers/review.js');
//validate function for review



 //delete route to delete a specific review by id
router.delete('/:reviewId',isLoggedIn,isReviewAuthor ,wrapAsync(reviewController.deleteReview) );

//review routes
//post route to add a new review to a specific listing
router.post('/',isLoggedIn,validateReview,wrapAsync(reviewController.createReview ) );


module.exports = router;