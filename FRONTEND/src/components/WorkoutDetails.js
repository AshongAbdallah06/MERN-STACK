import React from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import trashcan from "../trashcan.svg";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Axios from "axios";

const WorkoutDetails = ({ workout }) => {
	const { dispatch } = useWorkoutsContext();

	const handleClick = async () => {
		try {
			const response = await Axios.delete(
				`http://localhost:4000/api/workouts/${workout._id}`
			);
			const json = await response.data;

			dispatch({ type: "DELETE_WORKOUT", payload: json });
		} catch (error) {
			console.log("Unable to delete");
		}
	};

	return (
		<div className="workout-details">
			<h4>{workout.title}</h4>
			<p>
				<strong>Load (kg): </strong>
				{workout.load}
			</p>
			<p>
				<strong>Number of reps: </strong>
				{workout.reps}
			</p>
			<p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>

			<span onClick={handleClick}>
				<img
					src={trashcan}
					alt="trashcan"
				/>
			</span>
		</div>
	);
};

export default WorkoutDetails;
