import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import Axios from "axios";

const Home = () => {
	const { workouts, dispatch } = useWorkoutsContext();
	const [emptyWorkouts, setEmptyWorkouts] = useState("");

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				const response = await Axios.get("http://localhost:4000/api/workouts");
				const json = response.data; //  parse JSON responses

				// Dispatch the action to set workouts
				dispatch({ type: "SET_WORKOUTS", payload: json });
			} catch (error) {
				setEmptyWorkouts("Nothing to see here");
			}
		};

		fetchWorkouts();
	}, [dispatch]);

	return (
		<div className="home">
			<div className="workouts">
				{workouts ? (
					workouts.map((workout) => (
						<WorkoutDetails
							key={workout._id}
							workout={workout}
						/>
					))
				) : (
					<p>{emptyWorkouts}</p>
				)}
			</div>
			<WorkoutForm />
		</div>
	);
};

export default Home;
