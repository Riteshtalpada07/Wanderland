const Listing = require('../models/listing');

module.exports.index = async(req, res) => {
  const all =await Listing.find({});
  res.render('./listings/index.ejs', {all });
};

module.exports.renderNewForm = (req, res) => {
  res.render('./listings/new.ejs');
};

module.exports.showListing = async(req, res) => {
  const {id} = req.params;
  const listing = await Listing.findById(id).populate({path :'reviews',populate:{path:'author'},}).populate('owner');
  if(!listing){
    req.flash('error', 'listing not found!');
    return res.redirect('/listings');
  }
  res.render('./listings/show.ejs', {listing});
};

module.exports.createListing = async(req, res,next) => {
 let url =  req.file.path;
 let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
   newListing.owner = req.user._id;
    newListing.image = {url, filename};
   await newListing.save();
   req.flash('success', 'Successfully created a new listing!');
   res.redirect("/listings");

};

module.exports.renderEditForm = async(req, res) => {
   const {id} = req.params;
   const listing = await Listing.findById(id).populate('owner');

   listing.image.url = listing.image.url.replace('/upload', '/upload/ar_1.0,c_fill,h_200,w_300');
   res.render('./listings/edit.ejs', {listing});
};

module.exports.updateListing = async(req, res) => {
   const {id} = req.params;
   let listing = await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators: true, new: true});
   if(typeof req.file !== 'undefined'){
   let url =  req.file.path;
   let filename = req.file.filename;
   listing.image = {url, filename};
   await listing.save();
   }
   req.flash('success', 'listing updated successfully!');
   res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async(req, res) => {
   const {id} = req.params;
   const listing = await Listing.findById(id);
   await Listing.findByIdAndDelete(id);
   req.flash('success', 'listing deleted successfully!');
   res.redirect('/listings');
};