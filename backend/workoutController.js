const express = require('express')

const Workout = require('../models/workoutModel')

// Get All Workouts

// Get Single Workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body

  try {
    const workout = await Workout.create({ title, reps, load })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Create New Workout

//Delete a workout

// Update a workout
