import { useState } from "react";
import axios from "axios";
import UserProfile from "../../components/UserProfile/UserProfile";

export default function UserPage(): JSX.Element {
	const loginUrl = `${process.env.REACT_APP_API_URL}user/login`;
	const signupUrl = `${process.env.REACT_APP_API_URL}user/signup`;

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
			console.log("You've successfully signed up!");
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
			console.log("You've successfully logged in!");
		} catch (error) {
			setIsLoginError(true);
			setErrorMessage(`Unable to login: ${error}`);
		}
	};

	function renderSignup(): JSX.Element {
		return (
			<div className="signup form">
				<h1 className="signup__title">SIGN UP</h1>
				<form className="signup__form" onSubmit={handleSignup}>
					<input
						className="form__input signup__input"
						type="text"
						name="username"
						placeholder="Enter a username"
					/>
					<input
						className="form__input signup__input"
						type="text"
						name="name"
						placeholder="Enter a name"
					/>
					<input
						className="form__input signup__input"
						type="password"
						name="password"
						placeholder="Enter a password"
					/>

					<button
						type="submit"
						className="button signup__button"
					>
						Sign Up
					</button>
				</form>
			</div>
		);
	}

	function renderLogin(): JSX.Element {
		return (
			<div className="login">
				<h1 className="login__title">LOG IN</h1>
				{isLoginError && (
					<label className="label--error">{errorMessage}</label>
				)}
				<form className="login__form" onSubmit={handleLogin}>
					<input
						className="form__input login__input"
						type="text"
						name="username"
						placeholder="Enter your username"
					/>
					<input
						className="form__input login__input"
						type="password"
						name="password"
						placeholder="Enter your password"
					/>
					<button type="submit">Log In</button>
				</form>
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
