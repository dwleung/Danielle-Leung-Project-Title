import "./UserPage.scss";
import { useState, useEffect } from "react";
import UserProfile from "../../components/UserProfile/UserProfile";
import Signup from "../../components/Signup/Signup";
import Login from "../../components/Login/Login";

interface UserPageProps {
	baseUrl: string | undefined;
}

export default function UserPage({ baseUrl }: UserPageProps): JSX.Element {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isSignedUp, setIsSignedUp] = useState(false);

	//get token to check if logged in
	//otherwise navigate to sign up page
	useEffect(() => {
		const token = localStorage.getItem("JWT token");
		if (token) {
			setIsLoggedIn(true);
			setIsSignedUp(true);
		}
	}, []);

	// if (!isSignedUp) {
	// 	return <Signup baseUrl={baseUrl} setState={setIsSignedUp} />;
	// }

	return (
		<div className="authPage">
			{!isSignedUp && (
				<Signup baseUrl={baseUrl} setState={setIsSignedUp} />
			)}
			{!isLoggedIn && isSignedUp && (
				<Login baseUrl={baseUrl} setState={setIsLoggedIn} />
			)}
			<UserProfile setState={setIsLoggedIn} />
		</div>
	);
}
