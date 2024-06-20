import React, { useState } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
	const { dispatch } = useWorkoutsContext();

	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");
	const [errors, setErrors] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const workout = { title, load, reps };

		const response = await fetch("http://localhost:4000/api/workouts", {
			method: "POST",
			body: JSON.stringify(workout),
			headers: { "Content-Type": "application/json" },
		});

		const json = await response.json();

		if (!response.ok) {
			setErrors(json.errors);
		}

		if (response.ok) {
			setTitle("");
			setLoad("");
			setReps("");
			setErrors(null);

			// Dispatch the function. Paylaod is the single json object we recieve when we create the workout
			dispatch({ type: "CREATE_WORKOUT", payload: json });
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

			{errors && <div className="error">Please fill in all the fields</div>}
		</form>
	);
};

export default WorkoutForm;
