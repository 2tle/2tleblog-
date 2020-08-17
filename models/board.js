var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    contents: {type: String},
    author: {type: String},
    comment_date : {type: String},
    cauthor_img : {type:String, default: "https://cdn.jsdelivr.net/gh/2tle/staticfiles@master/static/user.png"}
});
var boardSchema = new mongoose.Schema({
    title: {type:String},
    contents: {type:String},
    contents_md: {type:String},
    author: {type:String},
    board_date: {type:String},
    comments: [commentSchema],
    category: {type:String},
    author_img : {type:String}
});

module.exports = mongoose.model('board', boardSchema);