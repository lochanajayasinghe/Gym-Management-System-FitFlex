const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Workout_reviewSchema = new mongoose.Schema
({
	description : {
		type : String,
		required : true
	},

	category : {
		type : String,
		required : true
	},

	stars: {
		type: String, // Change the type to String
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

const Workout_Review = mongoose.model("Workout_Review", Workout_reviewSchema);

module.exports = Workout_Review;


