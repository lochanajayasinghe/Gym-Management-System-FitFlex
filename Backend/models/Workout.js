const mongoose = require('mongoose');
const Exercise = require('./Exercise');


const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
  status: { type: String, enum: ['ongoing', 'completed'] },
  completedAt: { type: Date },
  totalCalories: { type: Number, default: 0 } // Add totalCalories field
});


const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
