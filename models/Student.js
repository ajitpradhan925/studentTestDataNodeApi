const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        maxlength: [12, 'Phone no cant be more than 12'],
        unique: true,
        required: true
    },
    regd_no: String,
    gender: String,
    address: {
        type: String
    }
});

module.exports = Student = mongoose.model('student', StudentSchema);