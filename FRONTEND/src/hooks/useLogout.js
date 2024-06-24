import useAuthContext from "./useAuthContext";
import useWorkoutsContext from "./useWorkoutsContext";

export const useLogout = () => {
	const { dispatch } = useAuthContext();
	const { dispatch: workoutsDispatch } = useWorkoutsContext();

	const logout = async () => {
		// Remove user from storage
		localStorage.removeItem("user");

		// Dispatch logout action
		dispatch({ type: "LOGOUT" });
		workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
		window.location.href = "/login";
	};

	return { logout };
};

export default useLogout;
