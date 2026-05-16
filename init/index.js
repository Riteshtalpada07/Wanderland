const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderland");
  console.log("Connected to MongoDB");
}

main().catch(err => {
  console.log("MongoDB connection error:", err);
});

const initDB = async () => {
  await Listing.deleteMany({});           
  await Listing.insertMany(initData.data);
  console.log("Database Initialized with Sample Data");
};

initDB();
