var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    contents: {type: String},
    author: {type: String},
    comment_date : {type: String},
    cauthor_img : {type:String, default: "https://cdn.jsdelivr.net/gh/2tle/staticfiles@master/static/user.png"}
});

module.exports = mongoose.model('comment',commentSchema);