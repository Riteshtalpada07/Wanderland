const sampleListings = [
  {
    title: "Luxury Pool Villa in Goa",
    description:
      "Enjoy a luxurious vacation in this private pool villa near the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    },
    price: 4500,
    location: "Goa",
    country: "India",
    category: "Pools",
},

{
    title: "Camping Dome in Manali",
    description:
      "Stay under the stars in this beautiful camping dome surrounded by mountains.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    price: 1200,
    location: "Manali",
    country: "India",
    category: "Camping",
},

{
    title: "Beach House in Kerala",
    description:
      "Relax by the Arabian Sea in this peaceful beachfront home.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
    },
    price: 3000,
    location: "Kerala",
    country: "India",
    category: "Beachfront",
},

{
    title: "Treehouse Retreat in Bali",
    description:
      "A unique treehouse experience in the middle of tropical forests.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    price: 2200,
    location: "Bali",
    country: "Indonesia",
    category: "Treehouses",
},

{
    title: "Mountain Cabin in Himachal",
    description:
      "Cozy wooden cabin with breathtaking Himalayan views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    },
    price: 1800,
    location: "Shimla",
    country: "India",
    category: "Mountains",
},

{
    title: "Luxury Farm Stay",
    description:
      "Experience village life with modern luxury amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    price: 2500,
    location: "Punjab",
    country: "India",
    category: "Farms",
},

{
    title: "Modern Studio Apartment",
    description:
      "Stylish studio apartment perfect for solo travelers and couples.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    },
    price: 1400,
    location: "Mumbai",
    country: "India",
    category: "Rooms",
},

{
    title: "Infinity Pool Resort",
    description:
      "Relax in a premium resort with a stunning infinity pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Pools",
},

{
    title: "Trending Glass House",
    description:
      "Instagram-famous glass house surrounded by forests.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    },
    price: 3200,
    location: "Sweden",
    country: "Sweden",
    category: "Trending",
},

{
    title: "Luxury Desert Camp",
    description:
      "Premium desert camping experience with royal hospitality.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    price: 2800,
    location: "Jaisalmer",
    country: "India",
    category: "Camping",
},

  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "Beachfront",
  },

  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "Rooms",
  },

  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "Mountains",
  },

  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "Luxe",
  },

  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    },
    price: 800,
    location: "Portland",
    country: "United States",
    category: "Treehouses",
  },

  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "Beachfront",
  },

  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    category: "Camping",
  },

  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: "Luxe",
  },

  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "Mountains",
  },

  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: "Trending",
  },
];

module.exports = { data: sampleListings };