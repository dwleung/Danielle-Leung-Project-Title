import { Project } from "../../utils/interfaces";

interface detailsPageProps {
	projectIdea: Project;
}

export default function IdeaDetailsPage({ projectIdea }: detailsPageProps) {
	const interests = localStorage.getItem("interests");
	const skills = localStorage.getItem("skills");
	const toggles = localStorage.getItem("toggles");

	return (
		<>
			<div className="prompt">
				You chose to customize your idea with:
				<div>
					Interests:
					<p>{interests}</p>
				</div>
				<div>
					Skills:
					<p>{skills}</p>
					<p>{toggles}</p>
				</div>
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
		</>
	);
}
