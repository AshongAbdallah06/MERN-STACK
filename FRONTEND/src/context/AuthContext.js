import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN_SIGNUP":
			return {
				user: action.payload,
			};
		case "LOGOUT":
			return {
				user: null,
			};
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
	});

	console.log("Authcontext state: ", state);

	return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
