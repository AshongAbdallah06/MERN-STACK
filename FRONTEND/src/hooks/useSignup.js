import { useState } from "react";
import useAuthContext from "./useAuthContext";
import Axios from "axios";

export const useSignup = () => {
	const { dispatch } = useAuthContext();
	const [isLoading, setIsLoading] = useState(null);
	const [errors, setErrors] = useState({});

	const signup = async (email, username, password) => {
		setIsLoading(true);
		setErrors(null);
		try {
			const response = await Axios.post(
				"https://mern-stack-3t1u.onrender.com/api/user/signup",
				{
					email,
					username,
					password,
				},
				{ withCredentials: true }
			);
			const data = response.data;

			localStorage.setItem("user", JSON.stringify(data));

			dispatch({ type: "LOGIN_SIGNUP", payload: data });
			setIsLoading(false);
			window.location.href = "/";
		} catch (error) {
			setIsLoading(false);

			setErrors(error.response.data);
		}
	};

	return { signup, isLoading, errors };
};

export default useSignup;
