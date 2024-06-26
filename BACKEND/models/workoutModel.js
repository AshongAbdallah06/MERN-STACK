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
		user_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Workout = model("workout", workoutSchema);
module.exports = Workout;
