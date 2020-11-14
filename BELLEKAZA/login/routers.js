const express = require("express")
const router = express.Router()

const views = require('./views.js')
const middlewares = require('./middlewares.js')

const bodyParser = require('body-parser')
router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


router.get('/', views.login)
router.post('/', middlewares.login, views.post_login)
router.get('/logout', views.logout)


module.exports = router