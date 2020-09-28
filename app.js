const express = require('express')
const app = express()
const port = 3000
const ToDo = require('./routes/routeToDo')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', ToDo)

app.listen(port, _=> console.log(`I love you ${port}`))