const express = require('express')
const {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController')
const router = express.Router()

// GET all workouts
router.get('/', getWorkouts)

// POST all workouts
router.post('/', createWorkout)

// GET single workouts
router.get('/:id', getSingleWorkout)

// Delete all workouts
router.delete('/:id', deleteWorkout)

// UPDATE all workouts
router.patch('/:id', updateWorkout)

module.exports = router
