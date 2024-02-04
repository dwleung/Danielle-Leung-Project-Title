import "./UserPage.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../../components/UserProfile/UserProfile";

interface UserPageProps {
	baseUrl: string | undefined;
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	isSignedUp: boolean;
	setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserPage({
	baseUrl,
	isLoggedIn,
	isSignedUp,
	setIsLoggedIn,
	setIsSignedUp,
}: UserPageProps): JSX.Element {
	const navigate = useNavigate();
	const token = localStorage.getItem("JWT token");
	//get token to check if logged in
	//otherwise navigate to sign up page
	useEffect(() => {
		if (token) {
			setIsLoggedIn(true);
			setIsSignedUp(true);
		}
	}, []);

	if (!token) {
		navigate("/user/signup");
	}
	if (!isLoggedIn && isSignedUp) {
		navigate("/user/login");
	}

	return (
		<div className="authPage">
			<UserProfile setState={setIsLoggedIn} />
		</div>
	);
}
