import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typewriter from "typewriter-effect";
import { getRandomText, loadingText, options } from "../../utils/typewriter";
import "./UserProfile.scss";
import { UserComponentProps } from "../../utils/interfaces";

interface UserInfo {
	id: number | undefined;
	name: string;
}

export default function UserProfile({ baseUrl, setState }: UserComponentProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [ideaList, setIdeaList] = useState<object[]>([]);
	const [userInfo, setUserInfo] = useState<UserInfo>({
		id: undefined,
		name: "",
	});
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
			} catch (error: any) {
				setErrorMessage(
					`There was an issue getting your profile: ${error.response.data.message}`
				);
			}
		};

		const fetchIdeas = async () => {
			try {
				const response = await axios.get(`${baseUrl}user/ideas`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log(response.data);
				// setIdeaList(response.data);
			} catch (error: any) {
				setErrorMessage(
					`There was an issue getting your saved ideas: ${error.response.data.message}`
				);
			}
		};

		fetchUserProfile();
		fetchIdeas();
	}, [token]);

	// Fetch user's saved prompts
	const interests = localStorage.getItem("Interests");
	const interestsList = interests?.split(",");
	const skills = localStorage.getItem("Skills");
	const skillsList = skills?.split(",");
	const toggles = localStorage.getItem("Toggles");
	const togglesList = toggles?.split(",");

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
		localStorage.removeItem("Interests");
		localStorage.removeItem("Skills");
		localStorage.removeItem("Toggles");
		navigate("/");
	};

	return (
		<div className="profile">
			{errorMessage && (
				<div className="profile__error-message">{errorMessage}</div>
			)}
			<h2 className="profile__title">{userInfo.name}</h2>
			<div className="profile__container">
				<h4 className="profile__subheader">My Prompts</h4>
				<div className="prompt__container">
					<div className="prompt__wrapper">
						<p>Interests</p>
						{interestsList?.map((interest) => {
							return (
								<span className="prompt__item">
									{interest.trim()}
								</span>
							);
						})}
					</div>
					<div className="prompt__wrapper">
						<p>Skills</p>
						{skillsList?.map((skill) => {
							return (
								<span className="prompt__item">
									{skill.trim()}
								</span>
							);
						})}
						{togglesList?.map((toggle) => {
							return (
								<span className="prompt__item">
									{toggle.trim()}
								</span>
							);
						})}
					</div>
				</div>
			</div>
			<div className="profile__container">
				<h3 className="profile__subheader">"My" Ideas</h3>

				{/* {ideaList.map((idea)=>{
                         return (
                              <div className="profile__idea">
                              <Link to=`/profile/ideas/${}`>
                              <div>{idea.title}</div> </Link>
                              </div>
                         )
                    })} */}
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
