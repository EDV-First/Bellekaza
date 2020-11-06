const users = require('./models.js')
const bcrypt = require('bcrypt')

const breadCrumb = (url) => {

    var arrTemporary = []
    arrTemporary.push({path : url, key : 'pmk'})
    var url = url.split("/")
    var Length = url.length
    for (let i = 0; i < Length-2; i++) {
        x = url.pop()
        arrTemporary[i].name = x
        arrTemporary.push({path : url.join("/"), name : x})
    }
    arrTemporary = arrTemporary.reverse()
    arrTemporary[0].name = 'Home'
    return arrTemporary
}

module.exports.breadCrumb = breadCrumb

module.exports.index = (req, res) => {
    const path = breadCrumb(req.originalUrl)

    res.render('./admin/templates/index.pug', {path})
}

module.exports.users = (req, res) => {
    const path = breadCrumb(req.originalUrl)

    users.find().then((users) => {
        res.render('./admin/templates/users.pug', {users, path})
    })
}

module.exports.user_create = (req, res) => {
    const path = breadCrumb(req.originalUrl)
    res.render('./admin/templates/user.create.pug', {path})
}

module.exports.post_user_create = (req, res) => {

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            
            const User = new users({
                username: req.body.username,
                // firstname: req.body.firstname,
                // lastname: req.body.lastname,
                password: hash,
                passwordconfirmation: hash,
                // email : req.body.email,
                // gender : req.body.gender,
                // bithday : req.body.bithday,
                staffstatus : false
            })
            User.save((err) => {
                if (err) {
                    return handleError(err);
                    // saved
                }
            })

        });
    });

    

    res.redirect('/admin/users')
}

module.exports.user_view = (req, res) => {
    const path = breadCrumb(req.originalUrl)    
    users.findById(req.params.id, function (err, user) {
        res.render('./admin/templates/user.view.pug', {path, user})
    });
    
    
}

module.exports.users_post = (req, res) => {
    if (req.body.select === 'delete') {
        delete req.body.select
        users.deleteMany({ _id : {$in : Object.keys(req.body)}}, function(err) {})
    }
    res.redirect('/admin/users')
}

module.exports.user_view_post = (req, res) => {
    users.updateOne({_id : req.params.id}, 
        { 
            username: req.body.username, 
            firstname : req.body.firstname, 
            lastname : req.body.lastname, 
            email : req.body.email,
            gender : req.body.gender,
            birthday : req.body.birthday,//.split("-").reverse().join("-")
            active : true ? req.body.active == 'on' : false,
            staffstatus : true ? req.body.staffstatus == 'on' : false
        }, function(err){})
    // console.log(req.body.birthday.split("-").reverse().join("-"))
    res.redirect('/admin/users')
}

module.exports.login = (req, res) => {
    res.cookie("name", "123456")
    
    res.render("./admin/templates/login.pug")
}