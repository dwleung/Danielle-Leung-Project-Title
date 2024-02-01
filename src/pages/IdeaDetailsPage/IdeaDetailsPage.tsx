import { Project } from "../../utils/interfaces";

interface detailsPageProps {
	projectIdea: Project;
}

export default function IdeaDetailsPage({ projectIdea }: detailsPageProps) {
	return (
		<>
			<div>
				<div>Project Title: {projectIdea.title}</div>

				<div>Project Description: {projectIdea.description}</div>
				<div>Project Features: {projectIdea.requirements}</div>
				{/* {projectIdea.requirements.length && (
						<ul>
							Project Features:
							<li>{projectIdea.requirements[0]}</li>
							<li>{projectIdea.requirements[1]}</li>
							<li>{projectIdea.requirements[2]}</li>
						</ul>
					)} */}
			</div>
		</>
	);
}
