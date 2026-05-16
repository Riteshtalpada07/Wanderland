const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const listings = require('./routes/listing');
const reviews = require('./routes/review');
const session = require('express-session');
const flash = require('connect-flash');

app.engine('ejs', ejsMate);
app.use(methodOverride('_method')); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const sessionOptions = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires:Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
       httpOnly: true
        }
};


//connect to mongodb

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderland');
    
}
main().then(()=>{
    console.log("Connected to MongoDB");
}   ).catch((err)=>{
    console.log("Error connecting to MongoDB:", err);
});

app.get('/',(req,res)=>{
    res.send("Hello World");
});

//use session and flash middleware
app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
}); 


//usedd to access routes in listing.js and review.js
app.use('/listings', listings);
app.use('/listings/:id/reviews', reviews);


//constom error handling middleware

app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  let { statusCode=500,message="something went wrong" } = err;
  res.status(statusCode).render('error.ejs', { err });
});


app.listen(8080,()=>{
    console.log("Server is running on port 8080 : http://localhost:8080/listings");
});