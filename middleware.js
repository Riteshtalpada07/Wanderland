const Listing = require('./models/listing');
const Review = require('./models/review');
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema,reviewSchema } = require('./schema.js');

module.exports.isLoggedIn = (req, res, next) => {

    if(!req.isAuthenticated()){

        req.session.redirectUrl = req.originalUrl;//store the original url in session to redirect after login
        req.flash('error', 'You must be signed in to access this page!');
        return res.redirect('/login');
    }   
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;//make redirect url available in res.locals for use in templates
    }  
    next();
};

module.exports.isOwner = async(req, res, next) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser._id)){
      req.flash('error', 'you do not have permission to do that!');
      return res.redirect('/listings');
    }
    next();
};


module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(errmsg, 400);
  } else {
    next();
  }
}; 

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(errmsg, 400);
  }else {    
    next();
  }
};

module.exports.isReviewAuthor = async(req, res, next) => {
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)){
      req.flash('error', 'You do not have permission to do that!');
      return res.redirect(`/listings/${id}`);
    } 
    next();
};

