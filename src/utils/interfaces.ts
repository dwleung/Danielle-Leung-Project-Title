interface Project {
	idea_id: string;
	title: string;
	description: string;
	requirements: string[];
}

interface UserInfo {
	id: number | undefined;
	name: string;
}

interface UserComponentProps {
	baseUrl: string | undefined;
	setState: React.Dispatch<React.SetStateAction<boolean>>;
	ideaList: Project[];
	setIdeaList: React.Dispatch<React.SetStateAction<Project[]>>;
	saveIdeaOnLogin: boolean;
	setProjectIdea: React.Dispatch<React.SetStateAction<Project>>;
	projectIdea: Project;
	setSaveIdeaOnLogin: (arg0: boolean) => void;
}

export type { Project, UserComponentProps, UserInfo };
