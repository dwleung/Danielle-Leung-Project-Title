import "./UserForm.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormProps {
	titleText: string;
	onSubmitFn: (e: any) => void;
	buttonText: string;
	isSignUpForm: boolean;
}

export default function UserForm(props: FormProps) {
	const navigate = useNavigate();

	return (
		<div className="signup form">
			<h1 className="signup__title">{props.titleText}</h1>
			<form className="signup__form" onSubmit={props.onSubmitFn}>
				{props.isSignUpForm && (
					<label>
						NAME
						<input
							className="form__input signup__input"
							type="text"
							name="name"
							placeholder="Enter a name"
						/>
					</label>
				)}
				<label>
					USERNAME
					<input
						className="form__input signup__input"
						type="text"
						name="username"
						placeholder="Enter a username"
					/>
				</label>
				<label>
					PASSWORD
					<input
						className="form__input signup__input"
						type="password"
						name="password"
						placeholder="Enter a password"
					/>
				</label>
				<button type="submit" className="button signup__button">
					{props.buttonText}
				</button>
				<button
					className="button button--cancel"
					onClick={() => navigate(-1)}
				>
					CANCEL
				</button>
			</form>
		</div>
	);
}
