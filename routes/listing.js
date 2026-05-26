const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing');
const { isLoggedIn,isOwner,validateListing } = require('../middleware.js');
const { populate } = require('../models/review.js');
const listingController = require('../controllers/listing.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });

//index route to display all listings and handle new listing creation
router.route('/')
      .get(wrapAsync(listingController.index))
      .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));

//new route to display form to create a new listing
router.get("/new", isLoggedIn , listingController.renderNewForm);

//show, update and delete routes for a specific listing by id
router.route('/:id').get(wrapAsync(listingController.showListing))
                    .put(isLoggedIn,isOwner ,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
                    .delete(isLoggedIn,isOwner ,wrapAsync(listingController.deleteListing));


//edit route to display edit form for a specific listing
router.get('/:id/edit',isLoggedIn,isOwner ,wrapAsync(listingController.renderEditForm));

router.get("/category/:category", async (req, res) => {

    let { category } = req.params;

    let listings;

    if(category === "All"){
        return res.redirect('/listings');
    } 
    
    listings = await Listing.find({ category });

    res.render("listings/index.ejs", { all: listings });

});

module.exports = router;