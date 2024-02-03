import { useState } from "react";
import axios from "axios";
import UserProfile from "../../components/UserProfile/UserProfile";
import "./UserPage.scss";
import UserForm from "../../components/UserForm/UserForm";

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
			sessionStorage.setItem("JWT token", response.data.token);
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
			<div>
				<UserForm
					titleText="SIGN UP"
					onSubmitFn={handleSignup}
					buttonText="SIGN UP"
					isSignUpForm={true}
				/>
			</div>
		);
	}

	function renderLogin(): JSX.Element {
		return (
			<div>
				{isLoginError && (
					<label className="label--error">{errorMessage}</label>
				)}
				<UserForm
					titleText="LOG IN"
					onSubmitFn={handleLogin}
					buttonText="LOG IN"
					isSignUpForm={false}
				/>
			</div>
		);
	}

	if (!isLoggedIn) {
		return renderLogin();
	}

	if (!isSignedUp) {
		return renderSignup();
	}

	return (
		<div className="authPage">
			<UserProfile />
		</div>
	);
}
