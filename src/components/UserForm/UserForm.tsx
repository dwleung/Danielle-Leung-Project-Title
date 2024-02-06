import "./UserForm.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface FormProps {
	onSubmitFn: (e: any) => void;
	buttonText: string;
	isSignUpForm: boolean;
}

interface FormValues {
	[key: string]: string | undefined;
}

export default function UserForm(props: FormProps) {
	const navigate = useNavigate();
	const [values, setValues] = useState<FormValues>({});
	const [errors, setErrors] = useState<FormValues>({});
	const [touched, setTouched] = useState<FormValues>({});
	const [focused, setFocused] = useState<string | null>(null);

	//Function to check if passwords matched
	const passwordCheck = () => {
		const password = values.password || "";
		const passwordRepeat = values.passwordRepeat || "";

		if (password !== passwordRepeat) {
			setErrors({
				...errors,
				password: "Passwords do not match",
				passwordRepeat: "Passwords do not match",
			});
		} else {
			setErrors({
				...errors,
				password: "",
				passwordRepeat: "",
			});
		}
	};

	//Function to handle input changes
	const handleChange = (e: any) => {
		const { name, value } = e.target;

		setValues((previousValues) => ({
			...previousValues,
			[name]: value,
		}));

		setErrors((previousErrors) => ({
			...previousErrors,
			[name]: value.trim() === "" ? "This field is required" : "",
		}));

		if (
			(props.isSignUpForm && name === "password") ||
			name === "passwordRepeat"
		) {
			passwordCheck();
		}
	};

	//Function to handle when an input is focused
	const handleFocus = (fieldName: string) => {
		setFocused(fieldName);
	};

	//Function to handle when an input is touched (onBlur event)
	const handleBlur = (e: any) => {
		const { name, value } = e.target;
		setFocused(null); //Clear the focused input when it loses focus
		setTouched({ ...touched, [name]: true });
		if (!value.trim()) {
			setErrors({ ...errors, [name]: "This field is required" });
		} else {
			setErrors({ ...errors, [name]: "" });
		}
	};

	const inputClassName = (fieldName: string) => {
		if (focused === fieldName) {
			return "input--focus";
		} else if (errors[fieldName]) {
			return "input--error";
		}
		return;
	};

	return (
		<div className="form-main">
			<form className="form" onSubmit={props.onSubmitFn}>
				{props.isSignUpForm && (
					<>
						<div className="form__label-wrapper">
							<label
								className="form__label"
								htmlFor="name"
							>
								NAME
							</label>
							{touched.name && errors.name && (
								<p className="error-message">
									{errors["name"]}
								</p>
							)}
						</div>
						<input
							className={`input form__input ${inputClassName(
								"name"
							)}`}
							type="text"
							name="name"
							value={values.name}
							onBlur={handleBlur}
							onChange={handleChange}
							onFocus={() => handleFocus("name")}
							placeholder="Enter a name"
							required
						/>
					</>
				)}
				<>
					<div className="form__label-wrapper">
						<label className="form__label" htmlFor="username">
							USERNAME
						</label>
						{touched.username && errors.username && (
							<p className="error-message">
								{errors["username"]}
							</p>
						)}
					</div>
					<input
						className={`input form__input ${inputClassName(
							"username"
						)}`}
						type="text"
						name="username"
						value={values.username}
						onBlur={handleBlur}
						onChange={handleChange}
						onFocus={() => handleFocus("username")}
						placeholder="Enter a username"
						required
					/>
				</>
				<>
					{" "}
					<div className="form__label-wrapper">
						<label className="form__label" htmlFor="password">
							PASSWORD
						</label>
						{errors.password && (
							<p className="error-message">
								{errors["password"]}
							</p>
						)}
					</div>
					<input
						className={`input form__input ${inputClassName(
							"password"
						)}`}
						type="password"
						name="password"
						value={values.password}
						onBlur={handleBlur}
						onChange={handleChange}
						onFocus={() => handleFocus("password")}
						placeholder="Enter a password"
						required
					/>
				</>
				{props.isSignUpForm && (
					<>
						<div className="form__label-wrapper">
							<label
								className="form__label"
								htmlFor="passwordrepeat"
							>
								RE-ENTER PASSWORD
							</label>
							{errors.password && (
								<p className="error-message">
									{errors["passwordRepeat"]}
								</p>
							)}
						</div>
						<input
							className={`input form__input ${inputClassName(
								"passwordRepeat"
							)}`}
							type="password"
							name="passwordRepeat"
							value={values.passwordRepeat}
							onBlur={handleBlur}
							onChange={handleChange}
							onFocus={() => handleFocus("passwordRepeat")}
							placeholder="Re-enter password"
							required
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
