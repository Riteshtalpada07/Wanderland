const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing.js");
const { init } = require("../models/user.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderland");
  console.log("Connected to MongoDB");
}

main().catch(err => {
  console.log("MongoDB connection error:", err);
});

const initDB = async () => {
  await Listing.deleteMany({}); 
  initData.data.map((obj) =>({...obj, owner: "64b8c9e5f1a4c2b9d8e4f123"})); ;         
  await Listing.insertMany(initData.data);
  console.log("Database Initialized with Sample Data");
};

initDB();
