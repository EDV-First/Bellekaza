const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    password: String,
    password_confirmation: String,
    email : String,
    gender : String,
    bithday : String,
});

// let User = mongoose.model('name Model', schema, 'name collection')
let User = mongoose.model('User', usersSchema, 'users')



module.exports = User