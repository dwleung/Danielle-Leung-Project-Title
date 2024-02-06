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

interface IdeaValues {
	[key: string]: string | string[] | undefined;
}

export default function UserProfile({ baseUrl, setState }: UserComponentProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [ideaList, setIdeaList] = useState<IdeaValues[]>([]);
	const [interestsList, setInterestsList] = useState<string[]>([]);
	const [skillsList, setSkillsList] = useState<string[]>([]);
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

		const fetchPrompts = async () => {
			console.log("inside fetch prompts");
			try {
				const response = await axios.get(`${baseUrl}user/prompts`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const prompts = response.data;
				console.log(prompts);
				prompts.forEach((element: any) => {
					const interests = element.interests.split(",");
					setInterestsList(interests);
					const skills = element.skills.split(",");
					const toggles = element.toggles.split(",");
					skills.push(toggles);
					setSkillsList(skills);
				});
			} catch (error: any) {
				setErrorMessage(
					`There was an issue getting your saved prompts: ${error.response.data.message}`
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
				const ideas = response.data;
				setIdeaList(ideas);
			} catch (error: any) {
				setErrorMessage(
					`There was an issue getting your saved ideas: ${error.response.data.message}`
				);
			}
		};

		fetchUserProfile();
		fetchPrompts();
		fetchIdeas();
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
				{interestsList && skillsList && (
					<>
						<div className="prompt">
							<div className="prompt__wrapper">
								<h4 className="prompt__category">
									Interests:
								</h4>
								{interestsList?.map((interest) => {
									return (
										<span className="prompt__item">
											{interest}
										</span>
									);
								})}
							</div>
							<div className="prompt__wrapper">
								<h4 className="prompt__category">
									Skills:
								</h4>
								{skillsList?.map((skill) => {
									return (
										<span className="prompt__item">
											{skill}
										</span>
									);
								})}
							</div>
						</div>
					</>
				)}
			</div>
			<div className="profile__container">
				<h3 className="profile__subheader">"My" Ideas</h3>

				{ideaList.map((idea) => {
					return (
						<div className="profile__idea">
							<div>{idea.title}</div>
						</div>
					);
				})}
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
