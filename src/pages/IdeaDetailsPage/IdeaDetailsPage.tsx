import { Project, UserInfo } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./IdeaDetailsPage.scss";

interface detailsPageProps {
	projectIdea: Project;
	baseUrl: string | undefined;
}

export default function IdeaDetailsPage({
	projectIdea,
	baseUrl,
}: detailsPageProps) {
	const [promptButtonText, setPromptButtonText] = useState("SAVE");
	const [ideaButtonText, setIdeaButtonText] = useState("SAVE");

	const interests = localStorage.getItem("Interests");
	const skills = localStorage.getItem("Skills");
	const toggles = localStorage.getItem("Toggles");
	const token = sessionStorage.getItem("JWT token");

	const navigate = useNavigate();

	// SAVE PROMPTS TO PROFILE
	const savePrompts = async () => {
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
			setPromptButtonText("SAVED!");
		} catch (error) {
			console.log(`Unable to save prompts to user profile: ${error}`);
		}
	};

	//SAVE IDEAS TO PROFILE
	const saveIdeas = async () => {
		if (!token) {
			navigate("/user/login");
			return;
		}

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
			setIdeaButtonText("SAVED!");
		} catch (error) {
			console.log(`Unable to save idea to user profile: ${error}`);
		}
	};

	return (
		<section className="idea-details-page">
			<h2 className="idea-details-page__title">IDEA</h2>
			{interests && skills && (
				<div className="prompt">
					<p className="prompt__subtitle">
						You customized your idea with:
					</p>
					<div className="prompt__wrapper">
						<h4 className="prompt__category">Interests:</h4>
						<p className="prompt__item">{interests}</p>
					</div>
					<div className="prompt__wrapper">
						<h4 className="prompt__category">Skills:</h4>
						<p className="prompt__item">
							{skills}
							{toggles}
						</p>
					</div>
					<button
						className="button prompt__button"
						onClick={savePrompts}
					>
						{promptButtonText}
					</button>
				</div>
			)}

			<div className="details">
				<div className="details__wrapper">
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
					{projectIdea.requirements.map((item) => {
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
				<button className="button" onClick={saveIdeas}>
					{ideaButtonText}
				</button>
			</div>
		</section>
	);
}
