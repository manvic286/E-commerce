const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connection to database has succeeded')
    } catch (error) {
        console.log('Connection to database failed')
    }
}

module.exports = dbConnection;