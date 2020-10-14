const express = require("express")
const router = express.Router()

const views = require('./views.js')

router.get('/', views.index)


module.exports = router