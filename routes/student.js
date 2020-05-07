const express = require('express');
const router = express.Router();

const Student = require('../models/Student');


/***
 * Add Student Api 
 * Method: POST
 */

 router.post('/add_student',async (req, res, next) => {

    
    try {

        const student = await Student.findOne({ phone: req.body.phone});

        if(student) {
            return res.json({
                success: false,
                message: "Student already registered with this phone number."
            });
        } else {
            let newStudent = await Student.create(req.body);

            res.json({
                success: true,
                message: "Student added successfully",
                student: newStudent
            });
        }


    } catch(error) {
        next(error);
    }
    
    res.json({
        success: true,
        message: "Student added successfully."
    });
 });



 /**
  * Get all students
  * Method GET
  */

  router.get('/all_students', async (req, res, next) => {
     try {
        const student = await Student.find({});

        res.json({
            success: true,
            total: student.length,
            students: student
        })
     } catch(err) {
        next(err);
     }
  });


  /**
   * Get Single Student By Id
   * Method GET
   */



   router.get('/single_user/:id', async (req, res, next) => {
       try {

            // Check if student exist or not
            let student = await Student.findById(req.params.id);

            if(!student) {
                return res.json({
                    success: false,
                    message: "Student ID doesn't exist"

                });
            } else {
                
                res.json({
                    success: true,
                    message: "Student found successfully",
                    student: student
                });
            }
       } catch(error) {
           next(error);
       }
   });


   /**
    * Update a single student data
    * Method PUT
    */

    
   router.put('/update_student/:id', async (req, res, next) => {
       try {

             // Check if student exist or not
             let student = await Student.findById(req.params.id);

             if(!student) {
                 return res.json({
                     success: false,
                     message: "Student ID doesn't exist"
 
                 });
             } else {
                 
                let updateStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                    runVaidator: true
                });

                res.json({
                    success: false,
                    message: "Student updated successfully.",
                    student: updateStudent
                });
             }
       } catch (error) {
           next(error);
       }
   });




    /**
    * Delete a single student data
    * Method DELETE
    */

   router.delete('/delete_student/:id', async (req, res, next) => {
    try {

          // Check if student exist or not
          let student = await Student.findById(req.params.id);

          if(!student) {
              return res.json({
                  success: false,
                  message: "Student ID doesn't exist"

              });
          } else {
              
           await student.remove();
           res.json({
               success: true,
               message: `Student with id ${req.params.id} deleted successfully`,
               student: {}
           });

          }
        } catch(error) {
            next(error);
        }

    });

 module.exports = router;