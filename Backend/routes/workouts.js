const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// POST create a new workout
router.post('/add', async (req, res) => {
  try {
    const workout = new Workout({
      name: req.body.name,
      description: req.body.description,
      exercises: req.body.exercises
      
    });

    const newWorkout = await workout.save();
    res.status(201).json(newWorkout);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const status = req.query.status; // Get the status query parameter

    let workouts;

    if (status) {
      // If status is provided, filter workouts by status
      workouts = await Workout.find({ status: status }).populate('exercises');
    } else {
      // If no status provided, return all workouts
      workouts = await Workout.find().populate('exercises');
    }

    res.json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

  router.get('/:id', async (req, res) => {
    try {
      const workout = await Workout.findById(req.params.id);
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
      res.json(workout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const workout = await Workout.findByIdAndDelete(req.params.id);
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
      res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  router.put('/complete/:id', async (req, res) => {
    try {
      const workout = await Workout.findByIdAndUpdate(
        req.params.id,
        { status: 'completed', completedAt: new Date() },
        { new: true }
      );
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
      res.status(200).json(workout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  router.put('/ongoing/:id', async (req, res) => {
    try {
      const workout = await Workout.findByIdAndUpdate(
        req.params.id,
        { status: 'ongoing' },
        { new: true }
      );
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
      res.status(200).json(workout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  router.put('/comlpete/:id', async (req, res) => {
    try {
      const workout = await Workout.findByIdAndUpdate(
        req.params.id,
        { status: 'comlpeted' },
        { new: true }
      );
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
      res.status(200).json(workout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
   
  
  
    
  
  module.exports = router;
  

 


  


