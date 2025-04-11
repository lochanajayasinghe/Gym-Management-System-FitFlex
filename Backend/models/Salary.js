// models/Employee.js

const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  workDays: {
    type: Number,
    required: true
  },
  salary: {
    type: Number,
    default: 0
  },
  salaryHistory: [
    {
      month: {
        type: String,
        required: true
      },
      salary: {
        type: Number,
        required: true
      }
    }
  ]
});

const Salary = mongoose.model('salary', SalarySchema);

module.exports = Salary;
