import "./GenerateIdeaPage.scss";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { Project } from "../../utils/interfaces";

interface IdeaPageProps {
	setProjectIdea: React.Dispatch<React.SetStateAction<Project>>;
}

export default function IdeaPage({ setProjectIdea }: IdeaPageProps) {
	// USER INPUT VALUES
	const [interests, setInterests] = useState("");
	const [skills, setSkills] = useState("");

	// RECORD CHAT HISTORY TO IMPROVE RANDOMNESS OF RESPONSE
	const [chatHistory, setChatHistory] = useState<object[]>([]);
	const [customChatHistory, setCustomChatHistory] = useState<object[]>([]);

	// UPDATE STATE FOR INPUT ELEMENTS
	const handlechangeInterests = (event: { target: HTMLInputElement }) => {
		setInterests(event.target.value);
	};

	const handleChangeSkills = (event: { target: HTMLInputElement }) => {
		setSkills(event.target.value);
	};

	// OPEN AI API REQUESTS
	const getRandomProjectIdea = async () => {
		const history = [
			...chatHistory,
			{
				role: "user",
				content: "Suggest a different software engineering project.",
			},
		];

		const responseString = await axios.post(
			`http://localhost:8080/openai/`,
			history
		);
		setChatHistory([
			...history,
			{
				role: "assistant",
				content: responseString.data.content,
			},
		]);
		const responseObject = JSON.parse(responseString.data.content);
		setProjectIdea(responseObject);
		console.log(responseObject);
		console.log(chatHistory);
	};

	const getCustomProjectIdea = async () => {
		const history = [
			...customChatHistory,
			{
				role: "user",
				content: `My interests are ${interests} and the skills I want to employ are ${skills}`,
			},
		];
		console.log("Custom Step 1: ", history);
		const responseString = await axios.post(
			`http://localhost:8080/openai/custom`,
			history
		);

		setCustomChatHistory([
			...history,
			{
				role: "assistant",
				content: responseString.data.content,
			},
		]);
		console.log("Custom Step 2: ", customChatHistory);

		const responseObject = JSON.parse(responseString.data.content);
		console.log(responseObject);
		setProjectIdea(responseObject);
	};

	return (
		<div>
			<header>
				<h1>Project Title</h1>
			</header>
			<div>
				<input
					id="inputInterest"
					name="inputInterest"
					type="text"
					value={interests}
					placeholder="Type something..."
					onChange={handlechangeInterests}
					className="input"
				></input>
				<input
					id="inputSkills"
					name="inputSkills"
					type="text"
					value={skills}
					placeholder="Type something..."
					onChange={handleChangeSkills}
					className="input"
				></input>
				<button onClick={getCustomProjectIdea}>CUSTOM IDEA</button>
				<button onClick={getRandomProjectIdea}>RANDOM IDEA</button>
			</div>
		</div>
	);
}
