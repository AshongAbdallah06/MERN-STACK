const { Schema, model } = require("mongoose");

const workoutSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title"],
		},
		reps: {
			type: Number,
			required: [true, "Reps"],
		},
		load: {
			type: Number,
			required: [true, "Load"],
		},
	},
	{ timestamps: true }
);

const Workout = model("workout", workoutSchema);
module.exports = Workout;
