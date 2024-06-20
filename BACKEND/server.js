require("dotenv").config();
const express = require("express");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const { connect } = require("mongoose");

const app = express();

// Connect to DB
connect(process.env.MONGODB_URI)
	.then(() => {
		// Listen for requests
		app.listen(process.env.PORT, () => {
			console.log("Connected and Listening on PORT ", process.env.PORT);
		});
	})
	.catch((err) => {
		console.log(err);
	});

// Middleware
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PATCH", "DELETE"],
		credentials: true,
	})
);

app.use((req, res, next) => {
	console.log(req.path, req.method);

	next();
});

app.use(express.json());

// Routes
app.use("/api/workouts", workoutRoutes);
