import "./IdeaDetailsPage.scss";
import axios from "axios";
import checkmark from "../../assets/icons/checkmark.svg";
import orangeArrow from "../../assets/icons/orangeArrow.svg";
import redo from "../../assets/icons/redo.svg";
import { Project } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface detailsPageProps {
	projectIdea: Project;
	baseUrl: string | undefined;
	setIdeaList: React.Dispatch<React.SetStateAction<Project[]>>;
	setSaveIdea: (arg0: boolean) => void;
}

export default function IdeaDetailsPage({
	projectIdea,
	baseUrl,
	setIdeaList,
	setSaveIdea,
}: detailsPageProps) {
	const [isButtonClicked, setIsButtonClicked] = useState(false);

	const interests = localStorage.getItem("Interests");
	const skills = localStorage.getItem("Skills")?.split(",");
	const toggles = localStorage.getItem("Toggles")?.split(",");
	const token = sessionStorage.getItem("JWT token");

	const navigate = useNavigate();

	const checkIdea = () => {
		if (projectIdea.title.length <= 1) {
			navigate("/idea");
			return null;
		}
	};

	useEffect(() => {
		checkIdea();
	}, []);

	// SAVE PROMPTS TO PROFILE
	const savePrompts = async () => {
		//Navigate to login page if user has not logged in
		if (!token) {
			navigate("/user/login");
			return;
		}

		try {
			const response = await axios.post(
				`${baseUrl}user/prompts`,
				{
					interests: interests,
					skills: skills,
					toggles: toggles,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response.data);
		} catch (error) {
			console.log(`Unable to save prompts to user profile: ${error}`);
		}
	};

	//SAVE IDEAS TO PROFILE
	//adds the current idea to state, in order to be retrieved when user logs in
	const saveIdeas = async () => {
		setSaveIdea(true);
		setIdeaList([projectIdea]);

		// Navigate user to login page if not logged in
		if (!token) {
			navigate("/user/login");
			return;
		}

		// Send POST idea request to database, returns the posted idea
		try {
			const response = await axios.post(
				`${baseUrl}user/ideas`,
				{
					title: projectIdea.title,
					description: projectIdea.description,
					requirements: projectIdea.requirements,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response.data);
			setIsButtonClicked(true);
		} catch (error) {
			console.log(`Unable to save idea to user profile: ${error}`);
		}
	};

	return (
		<section className="idea-details-page">
			<h2 className="idea-details-page__title">IDEA</h2>

			<div className="details">
				<div className="details__wrapper details__wrapper--title">
					<h3 className="details__title">{projectIdea.title}</h3>
				</div>

				<div className="details__wrapper">
					<h3 className="details__header">
						Project Description
					</h3>
					<p className="details__content">
						{projectIdea.description}
					</p>
				</div>
				<div className="details__wrapper">
					<h3 className="details__header">
						Project Requirements
					</h3>
				</div>
				<ul className="details__wrapper details__list">
					{typeof projectIdea.requirements === "string"
						? JSON.parse(projectIdea.requirements)
						: projectIdea.requirements.map((item) => {
								return (
									<li
										key={Math.random()}
										className="details__content"
									>
										{item}
									</li>
								);
						  })}
				</ul>
			</div>
			<div className="button__wrapper">
				<img
					className="button__navigate"
					onClick={() => {
						navigate(-1);
					}}
					src={orangeArrow}
					alt="arrow pointing left to go back"
				/>
				<img
					className={`button__save ${
						isButtonClicked ? "button__save--disabled" : ""
					}`}
					onClick={saveIdeas}
					src={checkmark}
					alt="checkmark to save"
				/>
			</div>
		</section>
	);
}
