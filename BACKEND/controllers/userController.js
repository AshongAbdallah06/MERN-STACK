// require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 60 * 60 * 24;
const createToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.login(email, password);

		const token = await createToken(user._id);
		res.cookie("jwt", token, { maxAge: maxAge * 1000 });

		res.status(200).json({ user, token });
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: error.message });
	}
};

const handleErrors = (err) => {
	let errors = { email: "", username: "", password: "" };

	if (err.message.includes("user validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	if (err.code == 11000 && err.message.includes("email")) {
		errors.email = "Email already registered";
	} else if (err.code == 11000 && err.message.includes("username")) {
		errors.username = "Username already in use";
	}

	return errors;
};

const signupUser = async (req, res) => {
	const { email, username, password } = req.body;

	try {
		const user = await User.create(req.body);

		const token = await createToken(user._id);
		res.cookie("jwt", token, { maxAge: maxAge * 1000 });

		res.status(200).json({ user, token });
	} catch (error) {
		console.log(error);
		const errors = await handleErrors(error);
		res.status(400).json(errors);
	}
};

module.exports = { loginUser, signupUser };
