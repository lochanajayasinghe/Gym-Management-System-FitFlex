const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Instruct_reviewSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  stars: {
    type: String,
    required: true
  },
  percent: { // New field for percentage
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Instruct_review = mongoose.model("Instruct_review", Instruct_reviewSchema);

module.exports = Instruct_review;
