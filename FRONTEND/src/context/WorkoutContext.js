import React, { useReducer } from "react";
import { createContext } from "react";

export const WorkoutsContext = createContext();

export const workoutReducer = (state, action) => {
	// Check action type
	switch (action.type) {
		// If action type is SET_WORKOUTS: return all the workout
		case "SET_WORKOUTS":
			return {
				workouts: action.payload,
			};
		// If action type is CREATE_WORKOUT: return the new workout and the previous state(which is all the workouts)
		case "CREATE_WORKOUT":
			return {
				workouts: [action.payload, ...state.workouts],
			};
		case "DELETE_WORKOUT":
			return {
				workouts: state.workouts.filter((w) => w._id !== action.payload._id),
			};
		// If there is no action return the state unchanged
		default:
			return state;
	}
};

const WorkoutContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(workoutReducer, {
		workouts: null,
	});

	return (
		<WorkoutsContext.Provider value={{ ...state, dispatch }}>
			{children}
		</WorkoutsContext.Provider>
	);
};

export default WorkoutContextProvider;
