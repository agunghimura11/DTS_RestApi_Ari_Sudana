import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI,{ // tambahkan &ssl=true
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        throw err
    }else{
        console.log('Database berhasil')
    } 
})

import router from './router.js'

const app = express()

//Middleware
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.get('/', (req, res) => {
    res.json({
        message: 'success',
    })
})

app.use('/api', router)

app.listen(process.env.PORT, () => {
    console.log(`App listen to port ${process.env.PORT}`)
})