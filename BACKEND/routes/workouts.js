const { Router } = require("express");
const {
	getAllWorkouts,
	getSingleWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
} = require("../controllers/workoutsController");
const requireAuth = require("../middleware/requireAuth");

const router = Router();

router.use(requireAuth);
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
