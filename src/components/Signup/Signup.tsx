import UserForm from "../UserForm/UserForm";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.scss";

interface SignupProps {
	baseUrl: string | undefined;
	setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Signup({ baseUrl, setState }: SignupProps) {
	const signupUrl = `${baseUrl}user/signup`;
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const handleSignup = async (e: any) => {
		e.preventDefault();

		try {
			await axios.post(signupUrl, {
				username: e.target.username.value,
				name: e.target.name.value,
				password: e.target.password.value,
			});
			setState(true);
			console.log("You've successfully signed up!");
		} catch (error) {
			console.log(error);
			setErrorMessage(`Unable to sign up: ${error}`);
		}
	};

	return (
		<div className="signup">
			<div className="signup__wrapper">
				<h2
					className="signup__title signup__title--inactive"
					onClick={() => navigate("/user")}
				>
					LOG IN
				</h2>
				<h2 className="signup__title">SIGN UP</h2>
			</div>
			<UserForm
				onSubmitFn={handleSignup}
				buttonText="SIGN UP"
				isSignUpForm={true}
			/>
		</div>
	);
}
