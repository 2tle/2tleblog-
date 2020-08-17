var express = require('express');
var router = express.Router();
var session = require('express-session');
var Board = require('../../models/board');
var Comment = require('../../models/comment');
var User = require('../../models/user');

router.get('/',(req,res) => {
    Board.find({}, (err,board) => {
        if(err) throw err;
        if(req.session.username){
            res.render('ejs/index', {isLoged: req.session.username, board:board});
        }
        else res.render('ejs/index', {isLoged: '로그인', board:board});
    });
});
router.get('/login', (req,res) => {
    if(req.session.username) {
        res.redirect('/manage');
    } else res.render('ejs/login', {isLoged: '로그인'});
});

router.post('/logincheck', (req,res) => {
    User.findOne({username: req.body.username, password: req.body.password}, (err,user) => {
        if (err || ( user != null && typeof user == "object" && !Object.keys(user).length )) res.json({"result":false});
        else {
            req.session.username = user.username;
            req.session.profileImg = user.profileImg;
            res.json({"result":true});
        }
    });
});


module.exports = router;