const users = require('../admin/models.js')
const bcrypt = require('bcrypt');


module.exports.login = (req, res, next) => {
    errs = []

    if (!req.body.username || !req.body.password) {
        errs.push("Username or Password is require")
    }
    
    users.findOne({username : req.body.username})
    .then((user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result) {
                    res.locals.user = user.id
                    next()
                }
                else {
                    errs.push("Username or password not found")
                    res.render('./login/templates/login.pug', {errs})
                    return; 
                }
            });
        }
        else {
            errs.push("Username not found")
            res.render('./login/templates/login.pug', {errs})
            return;
        }
        
    })    
}

module.exports.requireAuth = (req, res, next) => {
    if (!req.signedCookies.userID) {
        res.redirect('/login')
        return;
    }
    users.findById(req.signedCookies.userID, function(err, user) {
        if (!user) {
            res.redirect('/login')
            return;
        }
        if (user.staffstatus == false) {
            res.clearCookie('userID')
            res.render('./login/templates/login.pug')
            return;
        }
        if(user) {
            users.findById(req.signedCookies.userID, function(err, user) {
                res.locals.user_name = user.username
                next()
            })
        }
    })
}