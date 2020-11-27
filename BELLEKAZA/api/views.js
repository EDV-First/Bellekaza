const users = require('../admin/models.js')


module.exports.users = (req, res) => {
    users.find().then((users) => {
        res.json(users)
    })
}


module.exports.users_post = async function(req, res) {
    newUser = await users.create(req.body)
    res.json(newUser)
}

