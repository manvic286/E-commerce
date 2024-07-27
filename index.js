const express = require('express')
const dotenv = require('dotenv')
const dbConnection = require('./db')
const app = express()

// view engine
app.set('view engine', 'ejs')

// use middleware and static files(css, scripts, images, etc)
app.use(express.static('public'))

dotenv.config();

const PORT = process.env.Port

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.render('index', {title: 'Home'})
})

dbConnection()