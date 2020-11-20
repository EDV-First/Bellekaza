const users = require('../admin/models.js')
const bcrypt = require('bcrypt')

module.exports.login = (req, res) => {
    res.render("./login/templates/login.pug", { csrfToken: req.csrfToken() })
}

module.exports.post_login = (req, res) => {
    res.cookie('userID', res.locals.user, {signed : true})
    
    res.redirect('/admin')
}

module.exports.logout = (req, res) => {
    res.clearCookie('userID');
    res.redirect('/login')
}