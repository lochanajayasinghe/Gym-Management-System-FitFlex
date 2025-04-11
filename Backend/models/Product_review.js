const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Product_reviewSchema = new mongoose.Schema
({
	description : {
		type : String,
		required : true
	},

	type : {
		type : String,
		required : true
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

const Product_Review = mongoose.model("Product_Review", Product_reviewSchema);

module.exports = Product_Review;