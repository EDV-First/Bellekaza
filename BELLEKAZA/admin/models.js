const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    password: String,
    passwordconfirmation: String,
    email : String,
    gender : String,
    birthday : String,
    active : {type : Boolean, default : true},
    staffstatus : {type : Boolean, default : false}
});

// let User = mongoose.model('name Model', schema, 'name collection')
let User = mongoose.model('User', usersSchema, 'users')



module.exports = User