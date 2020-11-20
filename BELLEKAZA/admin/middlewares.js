const views = require('./views.js')
const users = require('./models.js')
const bcrypt = require('bcrypt')
const shortid = require('shortid')


module.exports.validate_create = (req, res, next) => {
    const path = views.breadCrumb(req.originalUrl)
    let errs = []
    if (!req.body.username) {
        errs.push('Name is require !')
    }
    if (!req.body.password) {
        errs.push('Password is require !')
    }
    if (!req.body.passwordconfirmation) {
        errs.push('Passwordconfirmation is require !')
    }
    if (req.body.password.length < 8) {
        errs.push('Your password must contain at least 8 characters !')
    }
    if (req.body.password !== req.body.passwordconfirmation) {
        errs.push('The two password fields didn’t match !')
    }
    if (!isNaN(Number(req.body.password))) {
        errs.push('Your password can’t be entirely numeric !')
    }
    if (errs.length) {
        res.render('./admin/templates/user.create.pug', {errs, path, values : req.body})
        return
    }
    next()
}

module.exports.sessionId = (req, res, next) => {
    if (!req.signedCookies.userID) {
        res.cookie('sessionId', shortid.generate(), {signed : true})
    }
    next()
}