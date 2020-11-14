require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const router_admin = require('./BELLEKAZA/admin/routers.js')
const router_login = require('./BELLEKAZA/login/routers.js')
const settings = require('./settings.js')
const middlewares = require('./BELLEKAZA/login/middlewares.js')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/express', {useNewUrlParser: true, useUnifiedTopology: true})


app.use(cookieParser(process.env.SESSION_SECRET))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/admin', middlewares.requireAuth, router_admin)
app.use('/login', router_login)



app.set('views', './BELLEKAZA')
app.set('view engine', 'pug')

app.use(express.static('static'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
