import { useState } from "react";
import axios from "axios";
import UserProfile from "../../components/UserProfile/UserProfile";

export default function UserPage(): JSX.Element {
	const loginUrl = `${process.env.REACT_APP_API_URL}login`;
	const signupUrl = `${process.env.REACT_APP_API_URL}signup`;

	const [isSignedUp, setIsSignedUp] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoginError, setIsLoginError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSignup = async (e: any) => {
		e.preventDefault();

		try {
			await axios.post(signupUrl, {
				username: e.target.username.value,
				name: e.target.name.value,
				password: e.target.password.value,
			});
			setIsSignedUp(true);
		} catch (error) {
			console.log(error);
			setErrorMessage(`Unable to sign up: ${error}`);
		}
	};

	const handleLogin = async (e: any) => {
		e.preventDefault();
		try {
			const response = await axios.post(loginUrl, {
				username: e.target.username.value,
				// bcrypt hash
				password: e.target.password.value,
			});
			localStorage.setItem("JWT token", response.data.token);
			setIsLoggedIn(true);
			setIsLoginError(false);
			setErrorMessage("");
		} catch (error) {
			setIsLoginError(true);
			setErrorMessage(`Unable to login: ${error}`);
		}
	};

	function renderSignup(): JSX.Element {
		return (
			<div className="signup form">
				<h1>SIGN UP</h1>
				<form onSubmit={handleSignup}>
					<input
						type="text"
						name="username"
						placeholder="Enter a username"
					/>
					<input
						type="text"
						name="name"
						placeholder="Enter a name"
					/>
					<input
						type="text"
						name="password"
						placeholder="Enter a password"
					/>
				</form>
				<button type="submit" className="button">
					Sign Up
				</button>
			</div>
		);
	}

	function renderLogin(): JSX.Element {
		return (
			<div>
				<h1>LOG IN</h1>
				{isLoginError && (
					<label className="label--error">{errorMessage}</label>
				)}
				<form onSubmit={handleLogin}>
					<input
						type="text"
						name="username"
						placeholder="Enter your username"
					/>
					<input
						type="text"
						name="password"
						placeholder="Enter your password"
					/>
				</form>
				<button type="submit">Log In</button>
			</div>
		);
	}

	if (!isSignedUp) {
		return renderSignup();
	}

	if (!isLoggedIn) {
		return renderLogin();
	}

	return (
		<div className="authPage">
			<UserProfile />
		</div>
	);
}
