const express = require("express")
const router = express.Router()
const views = require('./views.js')

const bodyParser = require('body-parser')
router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.get('/users', views.users)
router.post('/users', views.users_post)

module.exports = router