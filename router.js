import express from 'express'
import Homework from './database.js'

const router = express.Router()

export default router;
//@desc Create new homework
//@route POST /api/homeworks

router.get('/homeworks', async (req, res) => {
    const homework = await Homework.find({})

    if(homework){
        res.json(homework)
    } else {
        res.status(404).json({
            message: "Homework not found"
        })
    }
})

router.post('/homeworks', async (req,res)=> {
    try {
        const {
            course,
            title,
            due_date,
            status,
        } = req.body

        const homework = new Homework({
            course,
            title,
            due_date,
            status,
        })

        const createdHomework = await homework.save()

        res.status(201).json(createdHomework)
    } catch (error) {
        res.status(500).json({error: 'Database created'})
    }
})

