const express = require("express")
const router = express.Router()

const bodyParser = require('body-parser')

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const views = require('./views.js')

router.get('/', views.index)
router.get('/users', views.users)


module.exports = router