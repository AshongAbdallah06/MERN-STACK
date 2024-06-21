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

const signupUser = async (req, res) => {
	const { email, username, password } = req.body;

	try {
		const user = await User.signup(email, username, password);

		const token = await createToken(user._id);
		res.cookie("jwt", token, { maxAge: maxAge * 1000 });

		res.status(200).json({ user, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { loginUser, signupUser };
