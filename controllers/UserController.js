import User from './../models/user.js'
import express from 'express'
import bcrypt from 'bcrypt'

const userRouter = express.Router()



//add new user
userRouter.post('/add', async (req,res)=> {
    try{
        const{
            username,
            password
        } = req.body;

        //digit angka mau berapa banyak
        var saltRounds = 10
        const hashedPw = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            "username": username,
            "password": hashedPw
        })

        const createdUser = await newUser.save()

        res.status(201).json(createdUser)
    }
    catch(error){
        res.status(500).json({error: error})
    }
})

//login
userRouter.post('/login', async (req, res) => {
    try{

        const{
            username,
            password
        } = req.body;
        
        const currentUser = await new Promise((resolve, reject)=>{
            User.find({"username": username}, function(err, user){
                if(err) reject(err)
                resolve(user)
            })
        })
        
        //cek apakah ada user?
       if(currentUser[0]){
            //check password
            bcrypt.compare(password, currentUser[0].password).then(function(result) {
                if(result){
                    //urus token disini
                    res.status(201).json({"status":"logged in!"});
                }
                else
                    res.status(201).json({"status":"wrong password."});
            });
        }
        else{
            res.status(201).json({"status":"username not found"});
        }

    }
    catch(error){
        res.status(500).json({ error: error})
    }
})

// get all user
userRouter.get('/', async (req, res) => {
    // find all data in db
    const user = await User.find({})

    if(user){
        res.json(user)
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
})

// get user by id
userRouter.get('/:id', async (req, res) => {
    // find data by Id
    const user = await User.findById(req.params.id)

    if(user){
        res.json(user)
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
})

// Update user data
userRouter.put('/update', async (req,res) => {
    // json input { "id": "","username":"admin","password":"admin"}
    const{
        id,
        username,
        password
    } = req.body;
    
    var saltRounds = 10

    const currentUser = await new Promise((resolve, reject)=>{
        User.findOne({"_id": id}, function(err, user){
            if(err) reject(err)
            resolve(user)
        })
    })
    if(currentUser){
        currentUser.username = username
        currentUser.password = await bcrypt.hash(password, saltRounds) // hash password

        await currentUser.updateOne(function(err, user){
            if(err) throw err
            currentUser.save()
            res.json({
                data: currentUser,
                message: 'Data Update Successfully'
            })
        })
    }else{
        res.status(404).json({ // return 404 if data not found
            message: 'User not found'
        })
    }
})

// Delete field by id
userRouter.delete('/:id', async (req, res)=> {
    const currentUser = await User.findById(req.params.id) // awit for async find by id data

    if(currentUser){ // if success remove data
        await currentUser.remove()
        res.json({
            message: 'User removed successfully'
        })
    }else{
        res.status(404).json({ // return 404 if data not found
            message: 'User not found'
        })
    }
})

export default userRouter;