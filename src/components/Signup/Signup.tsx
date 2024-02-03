import UserForm from "../UserForm/UserForm";
import axios from "axios";
import { useState } from "react";

interface SignupProps {
	baseUrl: string | undefined;
	setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Signup({ baseUrl, setState }: SignupProps) {
	const signupUrl = `${baseUrl}user/signup`;

	const [errorMessage, setErrorMessage] = useState("");

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
