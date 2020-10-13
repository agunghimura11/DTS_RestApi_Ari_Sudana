import express from 'express' //dependency yang digunakan untuk mengembangkan REST AP
import morgan from 'morgan' //dependency yang digunakan sebagai middleware untuk melakukan logging setiap ada request
import mongoose from 'mongoose' //dependency yang digunakan untuk menghubungkan program dengan database MongoDB
import dotenv from 'dotenv' //dotenv, dependency yang digunakan untuk mengakses environment variable

dotenv.config() // menjalankan dependency enviroment variable

// connect to mongoDb
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

import router from './router.js' // import router handler

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

app.use('/api', router) //call router handler

app.listen(process.env.PORT, () => {
    console.log(`App listen to port ${process.env.PORT}`)
})