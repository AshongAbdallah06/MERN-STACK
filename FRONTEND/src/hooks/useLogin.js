import { useState } from "react";
import useAuthContext from "./useAuthContext";
import Axios from "axios";

export const useLogin = () => {
	const { dispatch } = useAuthContext();
	const [isLoading, setIsLoading] = useState(null);
	const [errors, setErrors] = useState({});

	const login = async (email, password) => {
		setIsLoading(true);
		setErrors(null);
		try {
			const response = await Axios.post(
				"http://localhost:4000/api/user/login",
				{ email, password },
				{ withCredentials: true }
			);
			const data = response.data;

			localStorage.setItem("user", JSON.stringify(data));

			dispatch({ type: "LOGIN_SIGNUP", payload: data });
			setIsLoading(false);
			window.location.href = "/";
		} catch (error) {
			setIsLoading(false);
			console.log(error);

			setErrors(error.response.data);
		}
	};

	return { login, isLoading, errors };
};

export default useLogin;
