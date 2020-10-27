const views = require('./views.js')

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
    if (errs.length) {
        res.render('./admin/templates/user.create.pug', {errs, path})
    }
    next()
}