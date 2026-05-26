if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
 
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const listingRouter = require('./routes/listing');
const reviewRouter = require('./routes/review');
const userRouter = require('./routes/user');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const dbUrl = process.env.ATLASDB_URL;


app.engine('ejs', ejsMate);
app.use(methodOverride('_method')); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//create a session store in MongoDB using connect-mongo 
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    },
    touchAfter: 24 * 60 * 60 // time period in seconds
});

const sessionOptions = {
    store,
    secret: process.env.SECRET_KEY,
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
    await mongoose.connect(dbUrl);
    
}
main().then(()=>{
    console.log("Connected to MongoDB");
}   ).catch((err)=>{
    console.log("Error connecting to MongoDB:", err);
});

store.on("error", function(e){
    console.log("Error in mongo session store", e);
});

//use session and flash middleware
app.use(session(sessionOptions));
app.use(flash());

//use passport middleware
app.use(passport.initialize());//initialize passport
app.use(passport.session());//use passport session
passport.use(new LocalStrategy(User.authenticate()));//use local strategy for authentication
passport.serializeUser(User.serializeUser());//serialize user
passport.deserializeUser(User.deserializeUser());//deserialize user

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
}); 

// //route to create a demo user for testing purposes
// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({ 
//          username: 'demouser', // Assuming you have a username field in your User model
//          email:'student@gmail.com'
//         });

//       let registeredUser = await User.register(fakeUser, 'helloworld');
//       res.send(registeredUser);
//     });

//usedd to access routes in listing.js and review.js
app.use('/listings', listingRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', userRouter);


//constom error handling middleware

app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  let { statusCode=500,message="something went wrong" } = err;
  res.status(statusCode).render('error.ejs', { err });
});


server.listen(8080,()=>{
    console.log("Server is running on port 8080 : http://localhost:8080/listings");
});
