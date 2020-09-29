require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const ToDo = require('./routes/route')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/', ToDo)
app.use(errorHandler)

app.listen(port, _=> console.log(`I love you ${port}`))