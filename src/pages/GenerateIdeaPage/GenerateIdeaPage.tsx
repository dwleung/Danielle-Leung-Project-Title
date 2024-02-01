import "./GenerateIdeaPage.scss";
import { useState } from "react";
import axios from "axios";
import React from "react";

export default function IdeaPage() {
	const [interests, setInterests] = useState("");
	const [skills, setSkills] = useState("");

	const handleInputChange = ({ target }: any) => {
		setInterests(target.value);
	};

	const getProjectIdea = async () => {
		const response = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/openai`,
			{
				interests: { interests },
				skills: { skills },
			}
		);
		console.log(response);
	};

	return (
		<div>
			<header>
				<h1>Project Title</h1>
				<input
					id="requestInput"
					name="requestInput"
					type="text"
					value={interests}
					placeholder="Type something..."
					onChange={handleInputChange}
					className="input"
				></input>
				<button onClick={getProjectIdea}>
					GENERATE PROJECT IDEA
				</button>
			</header>
		</div>
	);
}
