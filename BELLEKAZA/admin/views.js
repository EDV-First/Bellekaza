const users = require('./models.js')

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

    // const User = new users({name : 'viet', password : "123"})
    //     User.save((err) => {
    //         if (err) {
    //             return handleError(err);
    //             // saved
    //         }
    //     })

    users.find().then((users) => {
        res.render('./admin/templates/users.pug', {users, path})
    })
}

module.exports.user_create = (req, res) => {
    const path = breadCrumb(req.originalUrl)
    res.render('./admin/templates/user.create.pug', {path})
}

module.exports.post_user_create = (req, res) => {
    const path = breadCrumb(req.originalUrl)
    console.log(req.body)
}