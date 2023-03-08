
// Path: backend/controllers/registration.js
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Student = require('../models/studentSchema');
const Parent = require('../models/parentSchema');
const Class = require('../models/classSchema');
const Teacher = require('../models/teacherSchema');
const Admin = require('../models/adminSchema');
const Subject = require('../models/subjectSchema');

// @desc    Register a new student
// @route   POST /api/registration/student
// @access  Private
const registerStudent = asyncHandler(async (req, res) => {
    const { id, Fname, Lname, gender, dob, classId, isActive, joinDate, createdAt, updatedAt, createdBy } = req.body;
    if (!id || !Fname || !Lname || !gender || !dob || !classId || !isActive || !joinDate || !createdAt || !updatedAt || !createdBy) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const validateStudent = await Student.findOne({ id });
    if (validateStudent) {
        res.status(400);
        throw new Error('Student already exists');
    }
    const student = await Student.create({
        id,
        Fname,
        Lname,
        gender,
        dob,
        classId,
        isActive,
        joinDate,
        createdAt,
        updatedAt,
        createdBy,
    });
    if (student) {
        res.status(201).json({
            _id: student.id,
            firstName: student.Fname,
            lastName: student.Lname,
            gender: student.gender,
            dob: student.dob,
            classId: student.classId,
            isActive: student.isActive,
            joinDate: student.joinDate,
            createdAt: student.createdAt,
            updatedAt: student.updatedAt,
            createdBy: student.createdBy,
        });

    } else {
        res.status(400);
        throw new Error('invalid user data')
    }
});


//@desc   Register a new parent
//@route  POST /api/registration/parent
//@access Private
const registerParent = asyncHandler(async (req, res) => {
    const validateParent = await Parent.findById({ id });

    switch (validateParent) {
        case true:
            res.status(400);
            throw new error(`Parent of Id: ${id} already exists`);
            break;
        case false:
            const parent = await Parent.create({
                id,
                Fname,
                Lname,
                phone,
                createdAt,
                updatedAt,
                students,
            });
            break;
            if (parent) {
                res.status(201).json({
                    _id: parent.id,
                    Fname: parent.Fname,
                    Lname: parent.Lname,
                    phone: parent.phone,
                    createdAt: parent.createdAt,
                    updatedAt: parent.updatedAt,
                    students: parent.students
                });
            } else {
                res.status(400);
                throw new Error("Bad or Invalid Request");
            }
    }
});

//@desc   add a new class
//@route  POST /api/registration/class
//@access Private

const addClass = asyncHandler(async (req, res) => {
    const { id, name, classId, teacherId, description } = req.body
    const validateClass = await Class.findById({ id });
    if (validateClass) {
        res.status(400)
        throw new Error("Bad request, Class already exists");
    }
    const clas = await Class.create({
        id,
        name,
        classId,
        teacherId,
        description
    })
    if (clas) {
        res.json({
            _id: clas.id,
            name: clas.name,
            teacherId: clas.teacherId,
            description: clas.description
        });
    } else {
        res.status(400);
        throw new Error("Invalid or Bad Request");
    }
});

const registerTeacher = asyncHandler(async (req, res) => {
    const { id, Fname, Lname, email, gender, phone, isActive, joinDate, createdAt, workingDays } = req.body;

    const checkTeacher = await Teacher.findById({ id });
    if (checkTeacher) {
        res.status(400);
        throw new Error("Teacher already exists");
    }
    const teacher = await Teacher.create({
        id,
        Fname,
        Lname,
        email,
        gender,
        phone,
        isActive,
        joinDate,
        createdAt,
        workingDays
    });
    if (teacher) {
        res.json({
            _id: teacher.id,
            Fname: teacher.Fname,
            Lname: teacher.Lname,
            email: teacher.email,
            gender: teacher.gender,
            phone: teacher.phone,
            isActive: teacher.isActive,
            joinDate: teacher.joinDate,
            createdAt: teacher.createdAt,
            workingDays: teacher.workingDays
        });
    } else {
        res.status(400);
        throw new Error("Invalid or Bad Request");
    }
});

//@desc   add a new subject
//@route  POST /api/registration/subject
//@access Private

const addSubject = asyncHandler(async (req, res) => {
    const { id, name, classId, teacherId, description } = req.body;
    const checkSubject = await Subject.findById({ id });
    if (checkSubject) {
        res.status(400);
        throw new Error("Subject already exists");
    }
    await Subject.create({
        id,
        name,
        classId,
        teacherId,
        description
    });
});


//@desc   add a new admin
//@route  POST /api/registration/admin
//@access Private

const addAdmin = asyncHandler(async (req, res) => {
    const { names, email, password, role } = req.body;
    if (!names || !email || !password || !role) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const checkAdmin = await Admin.findOne({ email });
    if (checkAdmin) {
        res.status(400);
        throw new Error("Admin already exists");
    }
    const admin = await Admin.create({
        names,
        email,
        password,
        role
    });
    if (admin) {
        res.json({
            _id: admin.id,
            names: admin.names,
            email: admin.email,
            role: admin.role
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid or Bad Request");
    }
});


module.exports = {
    registerStudent,
    registerParent,
    addClass,
    registerTeacher,
    addSubject,
    addAdmin
}
