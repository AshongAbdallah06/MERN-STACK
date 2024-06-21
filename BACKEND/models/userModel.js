const { Schema, model } = require("mongoose");
const { isEmail, isStrongPassword } = require("validator");
const { genSalt, hash, compare } = require("bcrypt");

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			validate: [isEmail, "Please enter a valid email"],
			lowercase: true,
			unique: true,
		},
		username: {
			type: String,
			required: [true, "Username is required"],
			unique: true,
			lowercase: true,
			minlength: [3, "Username must be at least 3 characters"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			validate: [isStrongPassword, "Please enter a strong password"],
			minlength: [3, "Username must be at least 3 characters"],
		},
	},
	{ timestamps: true }
);

userSchema.statics.signup = async function (email, username, password) {
	const userExists = await this.findOne({ email });

	if (!userExists) {
		const salt = await genSalt(10);
		const hashedPassword = await hash(password, salt);

		console.log(this.password);

		const user = this.create({ email, username, password: hashedPassword });
		return user;
	}
	throw Error("Email has already been registered");
};

userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });

	if (user) {
		const matchPassword = await compare(password, user.password);

		if (matchPassword) {
			return user;
		}
		throw Error("Incorrect Password");
	}
	throw Error("Email not recognized");
};

const User = model("user", userSchema);
module.exports = User;
