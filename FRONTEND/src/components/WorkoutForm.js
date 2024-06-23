import React, { useState } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import Axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

const WorkoutForm = () => {
	const { dispatch } = useWorkoutsContext();
	const { user } = useAuthContext();

	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");
	const [errors, setErrors] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user) {
			setErrors("You must be logged in");
			return;
		}

		const workout = { title, load, reps };

		try {
			const response = await Axios.post("http://localhost:4000/api/workouts", workout, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});

			const json = await response.data;

			setTitle("");
			setLoad("");
			setReps("");
			setErrors(null);

			// Dispatch the function. Paylaod is the single json object we recieve when we create the workout
			dispatch({ type: "CREATE_WORKOUT", payload: json });
		} catch (error) {
			const errors = error.response.data.errors;
			setErrors("Please fill in all the fields");
		}
	};

	return (
		<form
			className="create"
			onSubmit={(e) => handleSubmit(e)}
		>
			<h3>Add a New Workout</h3>

			<label>Exercise Title</label>
			<input
				type="text"
				onChange={(e) => {
					setTitle(e.target.value);
				}}
				value={title}
				className={errors && errors.title && "error"}
			/>

			<label>Load (in kg):</label>
			<input
				type="number"
				onChange={(e) => {
					setLoad(e.target.value);
				}}
				value={load}
				className={errors && errors.load && "error"}
			/>

			<label>Reps:</label>
			<input
				type="number"
				onChange={(e) => {
					setReps(e.target.value);
				}}
				value={reps}
				className={errors && errors.reps && "error"}
			/>

			<button>Add Workout</button>

			{errors && <div className="error">{errors}</div>}
		</form>
	);
};

export default WorkoutForm;
