const express = require("express")
const router = express.Router()

const views = require('./views.js')
const middlewares = require('./middlewares.js')

const bodyParser = require('body-parser')
router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



router.get('/', views.index)
router.get('/users', views.users)
router.get('/users/create', views.user_create)
router.post('/users/create',middlewares.validate_create, views.post_user_create)


module.exports = router