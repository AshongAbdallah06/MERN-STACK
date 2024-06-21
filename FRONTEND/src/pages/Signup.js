import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup.js";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const { signup, errors, isLoading } = useSignup();

	const handleSubmit = async () => {
		await signup(email, username, password);
	};

	return (
		<form
			className="signup"
			onSubmit={(e) => {
				e.preventDefault();

				handleSubmit();
			}}
		>
			<h3>Signup</h3>
			<label>Email</label>
			<input
				type="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<div className="error-text">{errors && errors.email}</div>
			<label>Username</label>
			<input
				type="text"
				onChange={(e) => setUsername(e.target.value)}
				value={username}
			/>
			<div className="error-text">{errors && errors.username}</div>
			<label>Password</label>
			<input
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<div className="error-text">{errors && errors.password}</div>
			<button disabled={isLoading}>Sign up</button>
		</form>
	);
};

export default Signup;
