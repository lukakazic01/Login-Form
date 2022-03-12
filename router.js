const express = require('express');
const router = express.Router();
const users = [];
const bcrypt = require('bcrypt');
router.post('/login', async (req, res) => { 
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            email: req.body.email,
            password: hashedPassword
        })
        req.session.user = req.body.email;
        res.redirect('/route/dashboard')
    }
    catch {
       res.render('invalidUser')
    }
     console.log(users);
})


router.get('/dashboard', (req, res) => {
if(req.session.user){
    res.render('dashboard', {user: req.session.user})
    console.log(req.sessionID);
}else{
    res.send("Cookie expired");
}

})

router.get('/logout', (req, res) => {
    req.session.destroy(function(err){
        if(err){
          console.log(err)
          res.send("Error")
        }
        else{
            res.render('base', {logout: "Logged Out Successfully!"})
        }
    })
})

module.exports = router;