import React, { useState } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { isLoading, errors, login } = useLogin();

	const handleSubmit = async () => {
		await login(email, password);
	};

	return (
		<form
			className="login"
			onSubmit={(e) => {
				e.preventDefault();

				handleSubmit();
			}}
		>
			<h3>Login</h3>
			<label>Email</label>
			<input
				type="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<div className="error-text">{errors && errors.email}</div>

			<label>Password</label>
			<input
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<div className="error-text">{errors && errors.password}</div>

			<button disabled={isLoading}>Log in</button>
		</form>
	);
};

export default Login;
