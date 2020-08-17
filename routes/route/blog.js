var express = require('express');
var router = express.Router();
var Board = require('../../models/board');
var Comment = require('../../models/comment');
var session = require('express-session');
var moment = require('moment');
var md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
});

router.get('/:category', (req,res) => {
    if(req.session.username) var isL = req.session.username;
    else var isL = '로그인';
    Board.find({category: req.params.category}, (err,board) => {
        console.log(typeof(board));
        if (err || ( board != null && typeof board == "object" && !Object.keys(board).length )) {
            res.render('err/404', {isLoged:isL});
        }
        else res.render('ejs/category', {isLoged:isL,category:req.params.category,board:board});
    });
});

router.get('/view/:id', (req,res) => {
    if(req.session.username) var isL = req.session.username;
    else var isL = '로그인';
    Board.findOne({_id: req.params.id}, (err,board) => {
        if (err || ( board != null && typeof board == "object" && !Object.keys(board).length )) res.render('err/404', {isLoged:isL});
        else res.render('ejs/views', {isLoged:isL, board:board});
    });
});

router.post('/comment/write', (req,res) => {
    var comment = new Comment();
    comment.contents = req.body.contents;
    comment.comment_date = moment().format("YYYY-MM-DD H:mm:ss");
    comment.author = req.body.author;
    if(req.session.username) {
        comment.author = req.session.username;
    }
    if(req.session.cauthor_img) {
        comment.cauthor_img = req.session.profileImg;
    } else comment.cauthor_img = "https://cdn.jsdelivr.net/gh/2tle/staticfiles@master/static/user.png";
    Board.findOneAndUpdate({_id: req.body.id},{$push: {comments: comment}}, (err,board) => {
        if(err) res.json({"result":false});
        else res.json({"result":true});
    });
    
});

router.post('/board/write', (req,res) => {
    var board = new Board();
    board.title = req.body.title;
    board.contents_md = req.body.contents_md;
    board.contents = md.render(req.body.contents_md);
    board.author = req.session.username;
    board.board_date = moment().format("YYYY-MM-DD H:mm:ss");
    board.category = req.body.category;
    board.author_img = req.session.profileImg;
    board.save( (err) => {
        if(err) res.json({"result":false});
        else res.json({"result":true});
    });
});

router.post('/board/update/:id', (req,res) => {
    var board = new Board();
    board.title = req.body.title;
    board.contents_md = req.body.contents_md;
    board.contents = md.render(req.body.contents_md);
    board.author = req.session.username;
    board.board_date = moment().format("YYYY-MM-DD H:mm:ss");
    board.category = req.body.category;
    board.author_img = req.session.profileImg;
    Board.findOneAndUpdate({_id: req.params.id},{$push: {
        title: req.body.title,
        contents_md: req.body.contents_md,
        contents: md.render(req.body.contents_md),
        author: req.session.username,
        board_date: moment().format("YYYY-MM-DD H:mm:ss"),
        category: req.body.category,
        author_img: req.session.profileImg 
    }},(err,board1) => {
        if(err) res.json({"result":false});
        else res.json({"result":true});
    });
});

router.post('/delete/:id', (req,res) => {
    Board.deleteOne({_id:req.params.id}, (err) => {
        if(err) return res.json({"result":false});
        return res.json({"result":true})
    });
});



module.exports = router;