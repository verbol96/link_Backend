const express = require('express')
require('dotenv').config()
const sequelize = require('./db')
const router = require('./routes/indexRoute')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use('/api', router)

const start = async() =>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=> console.log(`server started! ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()