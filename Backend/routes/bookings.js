const express = require('express');
const Booking = require("../models/Booking");

const router = express.Router();

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { date, timeSlot, workoutType, packageType } = req.body;
    const newBooking = new Booking({ date, timeSlot, workoutType, packageType });
    await newBooking.save();
    res.status(201).send("Booking created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update an existing booking
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { date, timeSlot, workoutType, packageType } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(id, { date, timeSlot, workoutType, packageType }, { new: true });
    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.put('/approve/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Update the status to 'Confirmed'
    const updatedBooking = await Booking.findByIdAndUpdate(id, { status: 'Confirmed' }, { new: true });
    
    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    console.error("Error approving booking:", error);
    res.status(500).send("Internal Server Error");
  }
});
// Delete a booking
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.status(200).send("Booking deleted successfully");
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;