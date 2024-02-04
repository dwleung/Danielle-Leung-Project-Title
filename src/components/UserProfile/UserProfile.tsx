import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typewriter from "typewriter-effect";
import { getRandomText, loadingText, options } from "../../utils/typewriter";
import { UserComponentProps } from "../../utils/interfaces";

interface UserInfo {
	id: number | undefined;
	name: string;
	// prompts: string[],
	// ideas: object[]
}

export default function UserProfile({ setState }: UserComponentProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [userInfo, setUserInfo] = useState<UserInfo>({
		id: undefined,
		name: "",
	});
	const [errorMessage, setErrorMessage] = useState("");

	const token: string | null = sessionStorage.getItem("JWT token");
	useEffect(() => {
		if (!token) {
			return;
		}

		const fetchUserProfile = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}profile`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setIsLoading(false);
				setUserInfo({
					id: response.data.id,
					name: response.data.name,
				});
			} catch (error) {
				setErrorMessage(
					`There was an issue getting your profile: ${error}`
				);
			}
		};

		fetchUserProfile();
	}, [token]);

	if (isLoading) {
		<Typewriter
			options={options}
			onInit={(typewriter: any) => {
				loadingText.forEach(() => {
					typewriter
						.typeString(getRandomText())
						.pauseFor(1500)
						.deleteAll();
				});
				typewriter.start();
			}}
		/>;
	}

	const navigate = useNavigate();
	const handleLogout = () => {
		setState(false);
		localStorage.removeItem("JWT token");
		localStorage.removeItem("interests");
		localStorage.removeItem("skills");
		localStorage.removeItem("toggles");
		navigate("/");
	};

	return (
		<div className="profile">
			<h2>Welcome back, {userInfo.name}</h2>
			{errorMessage && (
				<div className="profile__error-message">{errorMessage}</div>
			)}
			<div>
				<h3>Prompts</h3>
				{/* Map thought array of prompts
                    
                    {prompts.map ((prompt)=>{
                         return (
                              <p>{prompt}</p>
                         )
                    })

                    }
                    */}
			</div>
			<div>
				<h3>"My" Ideas</h3>
				{/* map through array of ideas 
                    {ideas.map((idea)=>{
                         return (
                              <div className="profile__idea">
                              <Link to="/profile/ideas/:id">
                              <div>{idea.title}</div> </Link>
                              </div>
                         )
                    })}
                    
                    */}
			</div>
			<button onClick={handleLogout}>LOG OUT</button>
		</div>
	);
}
