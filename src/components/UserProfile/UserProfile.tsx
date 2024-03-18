import "./UserProfile.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import orangeArrow from "../../assets/icons/orangeArrow.svg";
import Typewriter from "typewriter-effect";
import { getRandomText, loadingText, options } from "../../utils/typewriter";
import { UserComponentProps, Project } from "../../utils/interfaces";
import { postIdeaToDB } from "utils/API";

interface UserInfo {
	id: number | undefined;
	name: string;
}

export default function UserProfile({
	baseUrl,
	setState,
	ideaList,
	setIdeaList,
	saveIdeaOnLogin,
	projectIdea,
	setProjectIdea,
	setSaveIdeaOnLogin,
}: UserComponentProps) {

	// STATE VARIABLES
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [interestsList, setInterestsList] = useState<string[]>([]);
	const [skillsList, setSkillsList] = useState<string[]>([]);
	const [userInfo, setUserInfo] = useState<UserInfo>({
		id: undefined,
		name: "",
	});
	const [showModal, setShowModal] = useState<boolean>(false);
	//NAVIGATION
	const navigate = useNavigate();

	//Function to check if user is logged in: checks for token, navigates to login if no token
	const token: string | null = sessionStorage.getItem("JWT token");
	const checkToken = () => {
		if (!token) {
			navigate("/user/login");
		}
		return null;
	};

	// Send API Post call if user requested to save idea before login
	// useEffect(() => {
	// 	if (saveIdeaOnLogin && projectIdea) {

	// 		const successCallback = (response: Project) => {
	// 			setSaveIdeaOnLogin(false);
	// 				return console.log(
	// 					"Save Idea response data",
	// 					response
	// 				);
	// 		}
	// 		const saveIdea = async () => {
	// 			try {
	// 				const response = await axios.post(
	// 					`${baseUrl}user/ideas`,
	// 					{
	// 						idea_id: projectIdea.idea_id,
	// 						title: projectIdea.title,
	// 						description: projectIdea.description,
	// 						requirements: projectIdea.requirements,
	// 					},
	// 					{
	// 						headers: {
	// 							Authorization: `Bearer ${token}`,
	// 						},
	// 					}
	// 				);
					
	// 			} catch (error) {
	// 				setErrorMessage(
	// 					`Unable to save idea to user profile: ${error}`
	// 				);
	// 			}
	// 		};
	// 		saveIdea();
	// 	} else {
	// 		const postPrompts = async () => {
	// 			const interests = localStorage
	// 				.getItem("Interests")
	// 				?.split(",");
	// 			const skills = localStorage.getItem("Skills")?.split(",");
	// 			const toggles = localStorage.getItem("Toggles")?.split(",");

	// 			try {
	// 				await axios.post(
	// 					`${baseUrl}user/prompts`,
	// 					{
	// 						interests: interests,
	// 						skills: skills,
	// 						toggles: toggles,
	// 					},
	// 					{
	// 						headers: {
	// 							Authorization: `Bearer ${token}`,
	// 						},
	// 					}
	// 				);
	// 			} catch (error) {
	// 				console.log(
	// 					`Unable to save prompts to user profile: ${error}`
	// 				);
	// 			}
	// 			postPrompts();
	// 		};
	// 	}
	// }, []);

	// API CALLS FOR PROFILE INFORMATION
	useEffect(() => {
		setIsLoading(true);
		checkToken();

		// Fetch user name and id
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
				console.log(error);
				setErrorMessage(
					`There was an issue getting your profile: ${error.message}`
				);
			}
		};

		// Fetch saved prompts
		const fetchPrompts = async () => {
			try {
				const response = await axios.get(`${baseUrl}user/prompts`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const prompts = response.data;
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

		// Fetch saved ideas
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
					`There was an issue getting your saved ideas: ${error}`
				);
			}
		};

		fetchUserProfile();
		fetchPrompts();
		fetchIdeas();
		setIsLoading(false);
		setShowModal(true);
	}, [token]);

	// Navigate to idea details page with clicked idea
	const handleClickIdea = (idea: Project) => {
		setProjectIdea(idea);
		navigate("/idea/details");
	};

	// Logout function to remove local and session storage items
	const handleLogout = () => {
		setState(false);
		sessionStorage.removeItem("JWT token");
		localStorage.removeItem("Interests");
		localStorage.removeItem("Skills");
		localStorage.removeItem("Toggles");
		navigate("/");
	};

	// Send POST idea request to database, returns the posted idea
	const saveIdeatoProfile = () =>{
		const successCallback = () => {
			navigate("/user");
		}
		postIdeaToDB({baseUrl: baseUrl, projectIdea: projectIdea, successCallback: successCallback, token: token});
	}

	return (
		<div className="profile">
			{errorMessage && (
				<div className="profile__error-message">{errorMessage}</div>
			)}
			<h2 className="profile__title">{userInfo.name}</h2>
			<section className="profile__section">
				<div className="profile__container">
					{interestsList && skillsList && (
						<>
							<div className="prompt">
								<div className="prompt__wrapper">
									<h4 className="prompt__subtitle">
										Interests:
									</h4>
									{interestsList?.map(
										(interest, i) => {
											return (
												<span
													key={i}
													className="prompt__item"
												>
													{interest}
												</span>
											);
										}
									)}
								</div>
								<div className="prompt__wrapper">
									<h4 className="prompt__subtitle">
										Skills:
									</h4>
									{skillsList?.map((skill, i) => {
										return (
											<span
												key={i}
												className="prompt__item"
											>
												{skill}
											</span>
										);
									})}
								</div>
							</div>
						</>
					)}
				</div>
				<div className="profile__container profile__container--ideas">
					<h3 className="profile__subheader">"My" Ideas</h3>
					{!ideaList.length ? (
						<p className="profile__note">
							You don't have any saved ideas yet!
						</p>
					) : (
						""
					)}

					{ideaList.map((idea) => {
						return (
							<div
								key={idea.idea_id}
								className="profile__idea-wrapper"
							>
								<p className="profile__idea">
									{idea.title}
								</p>
								<img
									className="profile__idea-button"
									onClick={() =>
										handleClickIdea(idea)
									}
									src={orangeArrow}
									alt="orange arrow pointing right"
								/>
							</div>
						);
					})}
				</div>
			</section>
			<button
				className="button button--cancel profile__button"
				onClick={handleLogout}
			>
				LOG OUT
			</button>
			{isLoading === true && (
				<div
					id="loading-modal"
					className={`modal ${
						isLoading === true ? "modal--show" : ""
					}`}
				>
					<Typewriter
						options={options}
						onInit={(typewriter: any) => {
							loadingText.forEach(() => {
								typewriter
									.typeString(getRandomText())
									.pauseFor(500)
									.deleteAll();
							});
							typewriter.start();
						}}
					/>
				</div>
			)}
			{showModal && 
				(
					<div id="save-modal" className="modal modal--save">
						console.log("Modal has been called")
						<div>
							<div>Save project idea</div>
							<div>Would you like to save the project idea
								{projectIdea.title}? 
							</div>
							<div>
								<button className="button" onClick={saveIdeatoProfile}>Save</button>
							</div>
						</div>
					</div>
				)
			}
		</div>
	);
}
