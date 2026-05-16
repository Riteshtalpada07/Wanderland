const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Review = require('./review');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: { 
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    image: {
        type: String,

        default:
        "https://images.pexels.com/photos/31817160/pexels-photo-31817160.jpeg",

        set: (v) =>
            v === ""
            ? "https://images.pexels.com/photos/31817160/pexels-photo-31817160.jpeg"
            : v
    },

    reviews: [
        {
            type: schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

listingSchema.post('findOneAndDelete', async (listing) => {

    if (listing) {

        await Review.deleteMany({
            _id: {
                $in: listing.reviews
            }
        });

    }

});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;