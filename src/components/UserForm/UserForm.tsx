import "./UserForm.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface FormProps {
	onSubmitFn: (e: any) => void;
	buttonText: string;
	isSignUpForm: boolean;
}

export default function UserForm(props: FormProps) {
	const navigate = useNavigate();
	// 	const [values, setValues] = useState({})
	// 	const [errors, setErrors] = useState<string[]>([]);
	// 	const [touched,setTouched] = useState(false);

	// 	//change event handler
	// 	const handleChange = (e) =>{
	// 		const {name, value: newValue,type} = e.target;
	// 		setValues({
	// 			...values,
	// 			[name]: value,
	// 		})
	// 	}

	// 	//check passwords equal each other
	// 	//disable submit button if there are form errors
	// const nameValidation = (fieldName, fieldValue) =>{
	// 	if (fieldValue.trim()=== ""){
	// 		return `${fieldName} is required`;
	// 	}
	// 	if (fieldValue.trim().length < 3) {
	// 		return `${fieldName} needs to be at least 3 characters`
	// 	}
	// }
	// const passwordCheck = (password, repeatPassword) => {
	// 	if (repeatPassword !== password) {
	// 		return `Passwords do not match`
	// 	}
	// }

	// const validate ={
	// 	name: name => nameValidation('name', name);

	// }

	return (
		<div className="form-main">
			<form className="form" onSubmit={props.onSubmitFn}>
				{props.isSignUpForm && (
					<>
						<label htmlFor="name">NAME</label>
						<input
							className="input form__input"
							type="text"
							name="name"
							placeholder="Enter a name"
						/>
					</>
				)}
				<label htmlFor="username">USERNAME</label>
				<input
					className="input form__input"
					type="text"
					name="username"
					placeholder="Enter a username"
				/>

				<label htmlFor="password">PASSWORD</label>
				<input
					className="input form__input"
					type="password"
					name="password"
					placeholder="Enter a password"
				/>
				{props.isSignUpForm && (
					<>
						<label htmlFor="passwordrepeat">
							RE-ENTER PASSWORD
						</label>
						<input
							className="input form__input"
							type="password"
							name="passwordrepeat"
							placeholder="Re-enter password"
						/>
					</>
				)}
				<div className="form__button-wrapper">
					<button type="submit" className="button">
						{props.buttonText}
					</button>
					<button
						className="button button--cancel"
						onClick={() => navigate(-1)}
					>
						CANCEL
					</button>
				</div>
			</form>
		</div>
	);
}
