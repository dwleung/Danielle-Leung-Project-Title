import "./GenerateIdeaPage.scss";
import { useState } from "react";
import axios from "axios";
import React from "react";

export default function IdeaPage() {
	const [interests, setInterests] = useState("");
	const [skills, setSkills] = useState("");
	type Project = {
		title: string;
		description: string;
		features?: string[];
		requirements?: string[];
	};
	const [projectIdea, setProjectIdea] = useState<Project>({
		title: "",
		description: "",
		features: [],
		requirements: [],
	});

	const [chatHistory, setChatHistory] = useState<object[]>([]);

	const handlechangeInterests = (event: { target: HTMLInputElement }) => {
		setInterests(event.target.value);
		console.log(interests);
	};

	const handleChangeSkills = (event: { target: HTMLInputElement }) => {
		setSkills(event.target.value);
		console.log(skills);
	};

	const getRandomProjectIdea = async () => {
		setTimeout(() => {
			console.log(chatHistory);
		}, 2000);

		const responseString = await axios.post(
			`http://localhost:8080/openai/`,
			chatHistory
		);
		setChatHistory([
			...chatHistory,
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
		const responseString = await axios.post(
			`http://localhost:8080/openai/custom`,
			{
				interests: { interests },
				skills: { skills },
			}
		);

		console.log(responseString.data.content);
		console.log(typeof responseString.data.content);
		const responseObject = JSON.parse(responseString.data.content);
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
			{projectIdea && (
				<div>
					<div>Project Title: {projectIdea.title}</div>

					<div>
						Project Description: {projectIdea.description}
					</div>
					{/* {projectIdea && (projectIdea.requirements.map((requirement)=>{
                              <p>{requirement}</p>
                         }))} */}
					<div>
						{" "}
						Project Features: {projectIdea.requirements}
					</div>
				</div>
			)}
		</div>
	);
}
