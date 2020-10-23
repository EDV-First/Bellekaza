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

module.exports.index = (req, res) => {
    const path = breadCrumb(req.originalUrl)

    users.find().then((users) => {
        res.render('./admin/templates/index.pug', {users, path})
    })
    
}

module.exports.users = (req, res) => {
    const path = breadCrumb(req.originalUrl)
    res.render('./admin/templates/base.pug', {path})
}