const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  exname: { type: String, required: true },
  description: { type: String },
  reps: { type: Number },
  imageUrl: { type: String },
  videoUrl: { type: String },
  category: { type: String },

  approximateCalories: { type: Number } // New field for approximate calories
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;