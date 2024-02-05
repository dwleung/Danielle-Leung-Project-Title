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
}

export type { Project, UserComponentProps, UserInfo };
