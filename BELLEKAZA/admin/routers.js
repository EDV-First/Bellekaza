const express = require("express")
const router = express.Router()
const multer = require('multer')
const views = require('./views.js')
const middlewares = require('./middlewares.js')

const bodyParser = require('body-parser')
router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var upload = multer({ dest: './static/admin/media' })

router.get('/', views.index)
router.get('/users', views.users)
router.post('/users', views.users_post)
router.get('/users/create', views.user_create)
router.post('/users/create', upload.single('avatar'), middlewares.validate_create, views.post_user_create)
router.get('/users/:id', views.user_view)
router.post('/users/:id', upload.single('avatar'), views.user_view_post)
router.get('/changepassword', views.change_password)
router.post('/changepassword', views.post_change_password)


module.exports = router