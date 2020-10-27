const express = require('express')
const admin = require('./BELLEKAZA/admin/router')
const mongoose = require('mongoose')
const settings = require('./settings.js')


const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/express', {useNewUrlParser: true, useUnifiedTopology: true})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/admin', admin)


app.set('views', './BELLEKAZA')
app.set('view engine', 'pug')

app.use(express.static('static'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
