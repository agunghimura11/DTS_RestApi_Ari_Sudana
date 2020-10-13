import express from 'express'
import Homework from './database.js' //import database handler

const router = express.Router()

export default router;
//@desc Create new homework
//@route POST /api/homeworks

// get all data
router.get('/homeworks', async (req, res) => {
    // find all data in db
    const homework = await Homework.find({})

    if(homework){
        res.json(homework)
    } else {
        res.status(404).json({
            message: "Homework not found"
        })
    }
})
// get data by id
router.get('/homeworks/:id', async (req,res) => {
    //find data by id
    const homework = await Homework.findById(req.params.id)
    
    if(homework) { // if success, return data in json
        res.json(homework)
    }else{
        req.status(404).json({
            message: 'Homework not found'
        })
    }
})
// post new data
router.post('/homeworks', async (req,res)=> {
    try {
        const { //get new data frim request body
            course,
            title,
            due_date,
            status,
        } = req.body
        // create new data in const Homework
        const homework = new Homework({
            course,
            title,
            due_date,
            status,
        })
        // save new data
        const createdHomework = await homework.save()

        res.status(201).json(createdHomework)
    } catch (error) {
        res.status(500).json({error: 'Database created'})
    }
})

// to update data by id
router.put('/homeworks/:id', async (req, res) => {
    const { //init data to store request body
        course,
        title,
        due_date,
        status,
    } = req.body
    //find data by id
    const homework = await Homework.findById(req.params.id)

    if(homework) { // set new value to old data 
        homework.course = course
        homework.title = title
        homework.due_date = due_date
        homework.status = status

        const updateHomework = await homework.save() // save update data
        res.json(updateHomework)
    }else{
        req.status(404).json({
            message: 'homework not found'
        })
    }
})

// Delete field by id
router.delete('/homeworks/:id', async (req, res)=> {
    const homework = await Homework.findById(req.params.id) // awit for async find by id data

    if(homework){ // if success remove data
        await homework.remove()
        res.json({
            message: 'homework removed'
        })
    }else{
        res.status(404).json({ // return 404 if data not found
            message: 'homework not found'
        })
    }
})

// Delete all field
router.delete('/remove', async (req, res)=> {
    
    const homework = await Homework.find({}) // get field id from all data
    
    if(homework){
        // use Promise.all to track all the async delete operations
        Promise.all( 
            homework.map(element => element.remove()) //lopping remove data one by one   
        )
        homework.splice(0, homework.length);
        res.json({
            data: homework,
            message: 'homework removed'
        })
        
    } else {
        res.status(404).json({
            message: "Delete all failed"
        })
    }
})


