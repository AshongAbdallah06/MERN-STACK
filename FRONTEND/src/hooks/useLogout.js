import { useState } from "react";
import useAuthContext from "./useAuthContext";
import Axios from "axios";

export const useLogout = () => {
	const { dispatch } = useAuthContext();

	const logout = async () => {
		// Remove user from storage
		localStorage.removeItem("user");

		// Dispatch logout action
		dispatch({ type: "LOGOUT" });
	};

	return { logout };
};

export default useLogout;
