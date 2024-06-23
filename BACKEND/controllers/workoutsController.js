const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

const handleErrors = (err) => {
	const errors = { title: "", load: "", reps: "" };

	if (err.message.includes("workout validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

// GET all requests
const getAllWorkouts = async (req, res) => {
	const user_id = req.user.id;
	const allWorkouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

	res.status(200).json(allWorkouts);
};

// GET single workout
const getSingleWorkout = async (req, res) => {
	const { id } = req.params;

	// Check if ID is valid
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "ID does not exist" });
	}

	try {
		const singleWorkout = await Workout.findById(id);

		// Check is a single workout was actually retrieved
		if (!singleWorkout) {
			return res.status(404).json({ error: "No such workout exists" });
		}

		res.json(singleWorkout);
	} catch (error) {
		res.status(404).json({ error: "No such workout exists" });
	}
};

// POST NEW workout
const createWorkout = async (req, res) => {
	try {
		const user_id = req.user._id.toString();
		const workout = await Workout.create({ ...req.body, user_id });
		res.status(201).json(workout);
	} catch (error) {
		const errors = await handleErrors(error);
		res.status(403).json({ errors });
	}
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
	const { id } = req.params;

	// Check if ID is valid
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "ID does not exist" });
	}

	try {
		const deletedWorkout = await Workout.findByIdAndDelete(id);

		// Check if a workout was actually deleted
		if (!deletedWorkout) {
			return res.status(404).json({ error: "No such workout exists" });
		}

		// If a workout was deleted, return it in the response
		res.status(200).json(deletedWorkout);
	} catch (error) {
		// Handle any unexpected errors that occur during the deletion process
		res.json({ error: error.message });
	}
};

// UPDATE a workout
const updateWorkout = async (req, res) => {
	const { id } = req.params;

	// Check if ID is valid
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "ID does not exist" });
	}

	try {
		const updatedWorkout = await Workout.findOneAndUpdate(
			{ _id: id },
			{ ...req.body },
			{ new: true, runValidators: true }
		);

		if (!updatedWorkout) {
			return res.status(404).json({ error: "No workout updated" });
		}

		res.status(200).json(updatedWorkout);
	} catch (error) {
		return res.status(404).json({ error: "No such work exist" });
	}
};

module.exports = {
	getAllWorkouts,
	getSingleWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
};
