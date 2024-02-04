import "./UserForm.scss";
import { useNavigate } from "react-router-dom";

interface FormProps {
	onSubmitFn: (e: any) => void;
	buttonText: string;
	isSignUpForm: boolean;
}

export default function UserForm(props: FormProps) {
	const navigate = useNavigate();

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
				<button type="submit" className="button">
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
