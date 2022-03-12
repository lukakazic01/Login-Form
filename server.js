const express = require('express');
const app = express();
const session = require('express-session');
const router = require('./router');
const flash = require('connect-flash');
const { v4:uuidv4} = require('uuid');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(flash());
app.use(session({
    secret: uuidv4(),
    resave: false,
    cookie: {maxAge: 30000},
    saveUninitialized: false,
}))
app.use('/route', router);
app.get('/', (req, res) => {
    res.render('base', {title: "Login System"})
})

app.listen(8000, () => console.log("App is running"));