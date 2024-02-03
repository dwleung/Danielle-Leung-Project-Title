import { Project } from "../../utils/interfaces";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

interface detailsPageProps {
	projectIdea: Project;
	baseUrl: string | undefined;
}

// 	const interestsArray = interests.split(",");
// console.log("Interests Array: ", interestsArray);
// const skillsArray = skills.split(",");
// console.log("Skills Array: ", skillsArray);

export default function IdeaDetailsPage({
	projectIdea,
	baseUrl,
}: detailsPageProps) {
	const [promptButtonText, setPromptButtonText] = useState("SAVE");

	const interests = localStorage.getItem("Interests");
	const skills = localStorage.getItem("Skills");
	const toggles = localStorage.getItem("Toggles");
	const { userId } = useParams();

	const navigate = useNavigate();

	// SAVE PROMPTS TO PROFILE
	const savePrompts = async () => {
		if (!userId) {
			navigate("/user");
			return;
		}

		try {
			const response = await axios.post(
				`${baseUrl}user/${userId}/prompts`,
				{
					interests: interests,
					skills: skills,
					toggles: toggles,
				}
			);
			console.log(response.data);
			setPromptButtonText("SAVED!");
		} catch (error) {
			console.log(`Unable to save prompts to user profile: ${error}`);
		}
	};

	return (
		<section className="idea-details-page">
			<div className="prompt">
				<h3>Prompts</h3>
				You chose to customize your idea with:
				<div>
					<h4>Interests:</h4>
					<p>{interests}</p>
				</div>
				<div>
					<h4>Skills:</h4>
					<p>{skills}</p>
					<p>{toggles}</p>
				</div>
				<button
					className="button prompt__button"
					onClick={savePrompts}
				>
					{promptButtonText}
				</button>
			</div>

			<div className="details">
				<div></div>

				<div className="details__wrapper">
					<h3 className="details__header">Project Title</h3>
					<p className="details__content">{projectIdea.title}</p>
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
					<li className="details__content">
						{projectIdea.requirements[0]}
					</li>
					<li className="details__content">
						{projectIdea.requirements[1]}
					</li>
					<li className="details__content">
						{projectIdea.requirements[2]}
					</li>
				</ul>
			</div>
		</section>
	);
}
