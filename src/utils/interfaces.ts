interface Project {
	id: string;
	title: string;
	description: string;
	requirements: string[];
}

interface UserComponentProps {
	baseUrl: string | undefined;
	setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { Project, UserComponentProps };
