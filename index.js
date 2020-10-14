const express = require('express')
const app = express()

const admin = require('./BELLEKAZA/admin/router')
const home = require('./BELLEKAZA/home/router')

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/admin', admin)
app.use('/home', home)

app.set('views', './BELLEKAZA')
app.set('view engine', 'pug')


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
