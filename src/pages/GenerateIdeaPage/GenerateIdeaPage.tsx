import "./GenerateIdeaPage.scss";
import React, { useState } from "react";
import axios from "axios";
import { Project } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import Toggle from "../../components/Toggle/Toggle";

interface IdeaPageProps {
	setProjectIdea: React.Dispatch<React.SetStateAction<Project>>;
	baseUrl: string | undefined;
}

export default function IdeaPage({ setProjectIdea, baseUrl }: IdeaPageProps) {
	// USER INPUT VALUES
	const [interests, setInterests] = useState("");
	const [skills, setSkills] = useState("");
	const [toggles, setToggles] = useState<string[]>([]);

	// RECORD CHAT HISTORY TO IMPROVE RANDOMNESS OF RESPONSE
	const [chatHistory, setChatHistory] = useState<object[]>([]);
	const [customChatHistory, setCustomChatHistory] = useState<object[]>([]);

	// CONTROLLED COMPONENTS FOR INPUT ELEMENTS
	const handlechangeInterests = (event: { target: HTMLInputElement }) => {
		setInterests(event.target.value);
	};
	const handleChangeSkills = (event: { target: HTMLInputElement }) => {
		setSkills(event.target.value);
	};

	// Add or delete item from list of toggles
	const handleToggle = (event: any) => {
		const item = event.target.getAttribute("name");
		const itemIndex: number = toggles.indexOf(item);

		// if item is not found in array, adds item to array
		if (itemIndex === -1) {
			const toggleArray = [...toggles, item];
			setToggles(toggleArray);
		}

		// if item is found in array, deletes item from array
		if (itemIndex >= 0) {
			const arrayWithoutItem = toggles.filter(
				(item, index) => index !== itemIndex
			);
			setToggles(arrayWithoutItem);
		}
	};

	//Navigation
	const navigate = useNavigate();

	// DATABASE POST REQUESTS

	const savePrompts = () => {
		localStorage.setItem("Interests", interests);
		localStorage.setItem("Skills", skills);
		localStorage.setItem("Toggles", toggles.toString());
	};

	// OpenAI API REQUESTS //
	// User input and API response is added into chat history, to decrease the chance of repeated responses from API
	// Response strings are converted to objects before setting projectIdea

	const getRandomProjectIdea = async (e: any) => {
		e.preventDefault();
		savePrompts();

		// Add the user input to chat history
		const history = [
			...chatHistory,
			{
				role: "user",
				content: "Suggest a different software engineering project.",
			},
		];

		// Keep the chat history length at max 10 items, to reduce the amount of data sent to API
		const shortHistory =
			history.length > 10 ? history.slice(-1, -9) : history;

		// API request with history
		const responseString = await axios.post(
			`${baseUrl}/openai/`,
			shortHistory
		);

		// Add new API response to chat history
		setChatHistory([
			...shortHistory,
			{
				role: "assistant",
				content: responseString.data.content,
			},
		]);

		// Convert response to object for better rendering, and navigate to project details
		const responseObject = JSON.parse(responseString.data.content);
		setProjectIdea(responseObject);
	};

	const getCustomProjectIdea = async (e: any) => {
		e.preventDefault();
		savePrompts();

		// Add user request to chat history
		const history = [
			...customChatHistory,
			{
				role: "user",
				content: `My interests are ${interests} and the skills I want to employ are ${skills} and ${toggles}`,
			},
		];

		// Keep the chat history length at max 10 items, to reduce the amount of data sent to API
		const shortHistory =
			history.length > 10 ? history.slice(-1, -9) : history;

		// Send API request with custom prompt & chat history
		const responseString = await axios.post(
			`http://localhost:8080/openai/custom`,
			shortHistory
		);

		// Update chat history with API response
		setCustomChatHistory([
			...shortHistory,
			{
				role: "assistant",
				content: responseString.data.content,
			},
		]);
		// Convert response to object for better rendering, and navigate to project details
		const responseObject = JSON.parse(responseString.data.content);
		setProjectIdea(responseObject);
		navigate("/idea/details");
	};

	return (
		<div className="idea">
			<h2 className="idea__title">IDEA</h2>
			<form className="idea__form">
				<div className="idea__input-wrapper">
					<p className="idea__input-question">
						What are some things that interest you? For
						example, hobbies, causes, industries, or
						curiosities.
					</p>

					<input
						className="form__input idea__input"
						id="inputInterest"
						name="inputInterest"
						type="text"
						value={interests}
						placeholder="Interests"
						onChange={handlechangeInterests}
					/>
				</div>
				<div className="idea__input-wrapper">
					<p className="idea__input-question">
						What would you like to work on in this project?
						For example, a programming language, a type of
						application, a type of feature.
					</p>

					<input
						id="inputSkills"
						name="inputSkills"
						type="text"
						value={skills}
						placeholder="Skills"
						onChange={handleChangeSkills}
						className="form__input idea__input"
					></input>
				</div>
				<div className="idea__toggles">
					<div className="idea__toggle-wrapper">
						{/* items that toggle ON and get added to the toggles list */}
						<Toggle
							clickHandler={handleToggle}
							name="database"
						/>
						database
					</div>
					<div className="idea__toggle-wrapper">
						{/* items that toggle ON and get added to the toggles list */}
						<Toggle clickHandler={handleToggle} name="API" />
						API
					</div>
					<div className="idea__toggle-wrapper">
						{/* items that toggle ON and get added to the toggles list */}
						<Toggle
							clickHandler={handleToggle}
							name="user login"
						/>
						user login
					</div>
					<div className="idea__toggle-wrapper">
						{/* items that toggle ON and get added to the toggles list */}
						<Toggle
							clickHandler={handleToggle}
							name="single-page application"
						/>
						single-page application
					</div>
				</div>
				<button onClick={getCustomProjectIdea}>CUSTOM IDEA</button>
			</form>

			<p>Need some inspiration?</p>
			<button onClick={getRandomProjectIdea}>RANDOM IDEA</button>
		</div>
	);
}
