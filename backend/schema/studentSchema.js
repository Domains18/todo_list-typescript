const Schema = require('express').Schema;

//Path: backend/models/studentSchema.js
const studentSchema = new Schema({
    id: {
        type: Object,
        required: true
    },
    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    classId: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    joinDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
});


const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
