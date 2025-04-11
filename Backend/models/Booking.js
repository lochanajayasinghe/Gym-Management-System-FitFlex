const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: String,
    timeSlot: String,
    workoutType: String,
    packageType: String,
    status: { type: String, default: 'Pending' } // Setting default value to 'Pending'
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
