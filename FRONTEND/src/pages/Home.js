import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import Axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

const Home = () => {
	const { workouts, dispatch } = useWorkoutsContext();
	const [emptyWorkouts, setEmptyWorkouts] = useState("");
	const { user } = useAuthContext();

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				const response = await Axios.get("http://localhost:4000/api/workouts", {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				});
				const json = response.data; //  parse JSON responses

				// Dispatch the action to set workouts
				dispatch({ type: "SET_WORKOUTS", payload: json });
			} catch (error) {
				setEmptyWorkouts("Nothing to see here");
			}
		};

		if (user) {
			fetchWorkouts();
		}
	}, [dispatch, user]);

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
