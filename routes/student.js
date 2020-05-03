const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

/** Add student API */
router.post('/', async (req, res, next) => {

    try {
        const student = await Student.findOne({phone: req.body.phone});
        if(student) {
            return res.json({
                success: false,
                message: "Student already added with this mobile no."
            });
           
        } else {
            let newStudent = await Student.create(req.body);
            res.json({
                success: true,
                message: "Student added successfully",
                student: newStudent
            })
            
           
        }
    } catch(err) {
        next(err);
    }
});



/**
 * GET ALL STUDENTS
 */

 router.get('/', async (req, res, next) => {
 
    try {
        let student = await Student.find({});
        res.json({
            message: true,
            total: student.length,
            students: student
        })
    } catch (error) {
        next(error);
    }
 });


 
/**
 * GET A  SINGLE STUDENT
 */

router.get('/:id', async (req, res, next) => {
 
    try {
        let student = await Student.findById(req.params.id);
        res.json({
            message: true,
            student: student
        })
    } catch (error) {
        next(error);
    }
 })


 
/**
 * UPDATE A  SINGLE STUDENT
 */

router.put('/:id', async (req, res, next) => {
 
    try {
        let student = await Student.findById(req.params.id);
        if(!student) {
            return res.json({
                success: false,
                message: 'Student does not exits.'
            })
        }
        
        let updateData = await Student.findByIdAndUpdate(
            req.params.id, req.body, {
                new: true,
                runValidators: true
            }
        );
        res.json({
            message: true,
            student: updateData
        })
    } catch (error) {
        next(error);
    }
 });


 /**
  * Delete a student
  */

  router.delete('/:id', async (req, res, next) => {
    try {
        let student = await Student.findById(req.params.id);
        if(!student) {
            return res.json({
                success: false,
                message: 'Student does not exits.'
            })
        }
        
        await student.remove();

        res.json({
            success: true,
            message: 'User successfully deleted.',
            data: {}
        });
    } catch(error) {
        
    }  
  })
module.exports = router;