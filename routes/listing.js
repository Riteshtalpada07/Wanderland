const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema } = require('../schema.js');
const Listing = require('../models/listing');

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(errmsg, 400);
  } else {
    next();
  }
}; 

//index route to display all listings
router.get('/', wrapAsync(async(req, res) => {
  const all =await Listing.find({});
  res.render('./listings/index.ejs', {all });
}));


router.get("/new", (req, res) => {
  res.render('./listings/new.ejs');
});

//show route to display a specific listing by id
router.get('/:id', wrapAsync(async(req, res) => {
  const {id} = req.params;
  const listing = await Listing.findById(id).populate('reviews');
  if(!listing){
    req.flash('error', 'listing not found!');
    return res.redirect('/listings');
  }
  res.render('./listings/show.ejs', {listing});
}));

//create route to add a new listing
router.post('/',validateListing,wrapAsync(async(req, res,next) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  req.flash('success', 'Successfully created a new listing!');
  res.redirect("/listings");

})); 


//edit route to display edit form for a specific listing
router.get('/:id/edit', wrapAsync(async(req, res) => {
  const {id} = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash('error', 'listing not found!');
    return res.redirect('/listings');
  }
  res.render('./listings/edit.ejs', {listing});
}));

//update route to update a specific listing by id
router.put('/:id',validateListing,wrapAsync(async(req, res) => {
  const {id} = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators: true, new: true});
  req.flash('success', 'listing updated successfully!');
  res.redirect(`/listings/${id}`);
}));

//delete route to delete a specific listing by id
router.delete('/:id', wrapAsync(async(req, res) => {
  const {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash('success', 'listing deleted successfully!');
  res.redirect('/listings');
}));





module.exports = router;