import {Project} from "./interfaces";
import axios from "axios";

interface APIFunctionsProps {
    projectIdea: Project;
    baseUrl: string | undefined;
    successCallback: ()=>void;
    failureCallback?: ()=>void;
    token: string | null;
}

const postIdeaToDB = async ({baseUrl, projectIdea, successCallback, token}:APIFunctionsProps) => {
    try {
        await axios.post(
            `${baseUrl}user/ideas`,
            {
                idea_id: projectIdea.idea_id,
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
        successCallback();
    } catch (error) {
        console.log(`Unable to save idea to user profile: ${error}`);
    }
}

export {postIdeaToDB};