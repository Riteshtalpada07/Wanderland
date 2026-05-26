const mongoose = require('mongoose');
const schema = mongoose.Schema;
const passsportLocalMongoose = require('passport-local-mongoose').default; 


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }

});   

userSchema.plugin(passsportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
    