import "./UserPage.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../../components/UserForm/UserForm";
import axios from "axios";
import { useState } from "react";

interface UserPageProps {
	baseUrl: string | undefined;
	setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserPage({
	baseUrl,
	setIsSignedUp,
	setIsLoggedIn,
}: UserPageProps): JSX.Element {
	const [isLoginError, setIsLoginError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const loginUrl = `${baseUrl}user/login`;
	const navigate = useNavigate();
	const token = sessionStorage.getItem("JWT token");

	useEffect(() => {
		if (token) {
			setIsLoggedIn(true);
			setIsSignedUp(true);
			navigate("/user");
		}
	}, []);

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
			navigate("/user");
		} catch (error: any) {
			console.log(error);
			setIsLoginError(true);
			setErrorMessage(
				`Unable to login: ${error.response.data.message}`
			);
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
				onSubmitFn={handleLogin}
				buttonText="LOG IN"
				isSignUpForm={false}
			/>
		</div>
	);
}
