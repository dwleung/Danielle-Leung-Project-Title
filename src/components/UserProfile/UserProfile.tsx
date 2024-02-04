import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typewriter from "typewriter-effect";
import { getRandomText, loadingText, options } from "../../utils/typewriter";
import { UserComponentProps } from "../../utils/interfaces";
import "./UserProfile.scss";

interface UserInfo {
	id: number | undefined;
	name: string;
	// prompts: string[],
	// ideas: object[]
}

export default function UserProfile({ baseUrl, setState }: UserComponentProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [userInfo, setUserInfo] = useState<UserInfo>({
		id: undefined,
		name: "",
	});
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const token: string | null = sessionStorage.getItem("JWT token");
	const checkToken = () => {
		if (!token) {
			navigate("/user/login");
		}
		return null;
	};

	useEffect(() => {
		checkToken();
		const fetchUserProfile = async () => {
			try {
				const response = await axios.get(`${baseUrl}user/profile`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log(response);
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

	const handleLogout = () => {
		setState(false);
		sessionStorage.removeItem("JWT token");
		localStorage.removeItem("interests");
		localStorage.removeItem("skills");
		localStorage.removeItem("toggles");
		navigate("/");
	};

	return (
		<div className="profile">
			{errorMessage && (
				<div className="profile__error-message">{errorMessage}</div>
			)}
			<h2 className="profile__title">{userInfo.name}</h2>
			<div className="profile__container">
				<h3 className="profile__subheader">Prompts</h3>
				{/* Map thought array of prompts
                    
                    {prompts.map ((prompt)=>{
                         return (
                              <p>{prompt}</p>
                         )
                    })

                    }
                    */}
			</div>
			<div className="profile__container">
				<h3 className="profile__subheader">"My" Ideas</h3>
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
			<button
				className="button button--cancel profile__button"
				onClick={handleLogout}
			>
				LOG OUT
			</button>
		</div>
	);
}
