import mongoose from 'mongoose'

// cretate new schema for mongodb
const homeworkSchema = mongoose.Schema({ 
    
    course: {
        type : String,
        required: true,
    },
    title: {
        type : String,
        required: true,
    },
    due_date: {
        type : Date,
        required: true,
    },
    status: {
        type : String,
        required: true,
    }
}, {
    timestamps: true,
}
)
// return Schema
const Homework = mongoose.model('Homework', homeworkSchema)
export default Homework