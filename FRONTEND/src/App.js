import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<div className="pages">
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/login"
							element={<Login />}
						/>
						<Route
							path="/signup"
							element={<Signup />}
						/>
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;
