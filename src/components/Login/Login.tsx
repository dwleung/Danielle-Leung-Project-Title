import UserForm from "../UserForm/UserForm";
import axios from "axios";
import { useState } from "react";
import { UserComponentProps } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";

export default function Login({ baseUrl, setState }: UserComponentProps) {
	const loginUrl = `${baseUrl}user/login`;
	const navigate = useNavigate();

	const [isLoginError, setIsLoginError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleLogin = async (e: any) => {
		e.preventDefault();
		try {
			const response = await axios.post(loginUrl, {
				username: e.target.username.value,
				// bcrypt hash
				password: e.target.password.value,
			});
			sessionStorage.setItem("JWT token", response.data.token);
			setState(true);
			setIsLoginError(false);
			setErrorMessage("");
			console.log("You've successfully logged in!");
		} catch (error) {
			setIsLoginError(true);
			setErrorMessage(`Unable to login: ${error}`);
		}
	};

	return (
		<div className="login">
			<div className="login__wrapper">
				<h2 className="login__title">LOG IN</h2>
				<h2
					className="login__title login__title--inactive"
					onClick={() => navigate("/user/signup")}
				>
					SIGN UP
				</h2>
			</div>

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
