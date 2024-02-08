interface Project {
	id: string;
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
	saveIdea: boolean;
	setProjectIdea: React.Dispatch<React.SetStateAction<Project>>;
	setSaveIdea: (arg0: boolean) => void;
}

export type { Project, UserComponentProps, UserInfo };
