const { Router } = require("express");
const {
	getAllWorkouts,
	getSingleWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
} = require("../controllers/workoutsController");

const router = Router();

// GET all requests
router.get("/", getAllWorkouts);

// GET single workout
router.get("/:id", getSingleWorkout);

// POST NEW workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
