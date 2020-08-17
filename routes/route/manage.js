var express = require('express');
var router = express.Router();
var session = require('express-session');
var Board = require('../../models/board');
var Comment = require('../../models/comment');
var User = require('../../models/user');

router.get('/',(req,res) => {
    if(!req.session.username) {
        res.send("<script>alert('잘못된 접근입니다.');location.href='/';</script>");
    } else {
        Board.find({}, (err,board) => {
            if(err) throw err;
            res.render('ejs/manage', {isLoged: req.session.username, board:board});
        });
    }
});

router.get('/write',(req,res) => {
    if(!req.session.username) {
        res.send("<script>alert('잘못된 접근입니다.');location.href='/';</script>");
    } else {
        res.render('ejs/write', {
            isLoged: req.session.username,
            title: '',
            category: '',
            funcName: 'write();'
        });
    }
});

router.get('/edit/:id' , (req,res) => {
    if(!req.session.username) {
        res.send("<script>alert('잘못된 접근입니다.');location.href='/';</script>");
    } else {
        Board.findOne({_id: id}, (err,board) => {
            if(err || ( board != null && typeof board == "object" && !Object.keys(board).length )) res.render('err/404', {isLoged: req.session.username});
            res.render('ejs/write', {
                isLoged: req.session.username,
                title: board.title,
                category: board.category,
                funcName: 'edit("'+board._id+'");'
            });
            
            
        });
        
    }
});





module.exports = router;