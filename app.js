const express          = require('express');
const path             = require('path');
const favicon          = require('serve-favicon');
const bodyParser       = require('body-parser');
const cookieParser     = require('cookie-parser');
const mongoose         = require('mongoose');
const methodOverride   = require('method-override');
const session = require("express-session");

const app              = express();
const port             = 3000;
const mongodb_string   = 'YOUR MONGODB ATLAS';

//ejs setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({
    secret: '@#^^#$^#!^#$$^#!^&!#&',
    resave: true,
    saveUninitialized: true
}));

//mongoose setup
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongodb_string);
var db = mongoose.connection;
db.once('open', function(){
    console.log('DB connected');
});
db.on('error', function(err){
    console.log('DB ERROR : ', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//route
app.use(require('./routes/index'));

//404
app.use((req, res, next) => {
    if(req.session.username) {
        res.render('err/404', { isLoged: req.session.username });
    } else {
        res.render('err/404', { isLoged: '로그인' });
    }
});

//errorHandler
app.use((err, req, res, next) => {
    if(req.session.username) {
        res.render('err/500', { isLoged: req.session.username });
    } else {
        res.render('err/500', { isLoged: '로그인' });
    }
});

//express
app.listen(port, () => console.log('express app listening on port', port));

//module
module.exports = app;