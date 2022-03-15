const express = require('express');
const router = express.Router();
const users = [];
const bcrypt = require('bcrypt');
router.post('/register', async (req, res) => { 
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/route/login');
    }
    catch {
       res.render('invalidUser');
    }
     console.log(users);
});

router.get('/login',  (req, res) => {
    res.render('login');
    
});
router.post('/login', async(req, res) => {
    const { password, email } = req.body;
    const doesPasswordsMatch= await bcrypt.compare(password, users[0].password);
    if(doesPasswordsMatch && email === users[0].email){
        req.session.user = email;
        res.redirect('/route/dashboard');  
    } 
    else {
        setTimeout(() => {
        res.render('login', {invalidUser: "Wrong email or password"});
    }, 1000);
    }
});


router.get('/dashboard', (req, res) => {
  if(req.session.user){
    res.render('dashboard', {user: req.session.user})
    console.log(req.sessionID);
  }
  else{
    res.redirect('/');
  }

});
router.get('/logout', (req, res) => {
    req.session.destroy(function(err){
        if(err){
          res.send("Couldnt log out");
        }
        else{
            res.clearCookie('connect.sid');
            res.render('register', {logout: "Logged Out Successfully"});
        }
    });
});

module.exports = router;