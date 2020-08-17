var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String},
    profileImg: {type: String, default: "https://cdn.jsdelivr.net/gh/2tle/staticfiles@master/profile.PNG"},
    password: {type:String}
});

module.exports = mongoose.model('user',userSchema);