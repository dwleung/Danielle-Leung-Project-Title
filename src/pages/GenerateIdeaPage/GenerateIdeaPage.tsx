import "./GenerateIdeaPage.scss";
import "../../styles/typewriter.scss";
import Toggle from "../../components/Toggle/Toggle";
import Typewriter from "typewriter-effect";
import { getRandomText, loadingText, options } from "../../utils/typewriter";
import blueArrow from "../../assets/icons/blueArrow.svg";
import orangeArrow from "../../assets/icons/orangeArrow.svg";
import React, { useState } from "react";
import axios from "axios";
import { Project } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";

interface IdeaPageProps {
	setProjectIdea: React.Dispatch<React.SetStateAction<Project>>;
	baseUrl: string | undefined;
	chatHistory: object[];
	setChatHistory: React.Dispatch<React.SetStateAction<object[]>>;
}

export default function IdeaPage(props: IdeaPageProps) {
	const { setProjectIdea, baseUrl, chatHistory, setChatHistory } = props;

	// USER INPUT VALUES
	const [interests, setInterests] = useState("");
	const [skills, setSkills] = useState("");
	const [toggles, setToggles] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	// CONTROLLED COMPONENTS FOR INPUT ELEMENTS
	const handlechangeInterests = (event: { target: HTMLInputElement }) => {
		setInterests(event.target.value);
	};
	const handleChangeSkills = (event: { target: HTMLInputElement }) => {
		setSkills(event.target.value);
	};

	// Add or delete items from list of toggles
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

	//NAVIGATION
	const navigate = useNavigate();

	//LOCAL STORAGE POST REQUESTS
	const savePrompts = () => {
		localStorage.setItem("Interests", interests);
		localStorage.setItem("Skills", skills);
		localStorage.setItem("Toggles", toggles.toString());
	};

	// OpenAI API REQUEST//
	// User input and API response is added into chat history, to decrease the chance of repeated responses from API
	// Response strings are converted to objects before setting projectIdea

	const getProjectIdea = async (e: any) => {
		e.preventDefault();
		savePrompts();
		setIsLoading(true);
		try {
			// Add user request to chat history
			const history = [
				...chatHistory,
				{
					role: "user",
					content: `Generate a software engineering project idea with detailed description and requirements. My interests are ${interests} and the skills I want to employ are ${skills} and ${toggles}`,
				},
			];

			// Keep the chat history length at max 10 items, to reduce the amount of data sent to API
			const shortHistory =
				history.length > 10 ? history.slice(-10) : history;

			// Send API request with custom prompt & chat history
			const response = await axios.post(
				`${baseUrl}openai`,
				shortHistory
			);

			// Update chat history with API response
			setChatHistory([
				...shortHistory,
				{
					role: "assistant",
					content: response.data.content,
				},
			]);

			// Convert response to object for better rendering, and navigate to project details
			setProjectIdea(JSON.parse(response.data.content));
			navigate("/idea/details");
		} catch (error) {
			console.log(`Error generating new idea: ${error}`);
		} finally {
			// Set isLoading to false regardless of success or error
			setIsLoading(false);
		}
	};

	return (
		<div className="idea">
			{isLoading === true && (
				<div
					id="loading-modal"
					className={`modal ${
						isLoading === true ? "modal--show" : ""
					}`}
				>
					<Typewriter
						options={options}
						onInit={(typewriter: any) => {
							loadingText.forEach(() => {
								typewriter
									.typeString(getRandomText())
									.pauseFor(500)
									.deleteAll();
							});
							typewriter.start();
						}}
					/>
				</div>
			)}
			<h2 className="idea__title">IDEA</h2>
			<form className="idea__form">
				<div className="idea__input-wrapper">
					<p className="idea__input-prompt">
						What are some things that interest you?{" "}
					</p>
					<p className="idea__input-subtitle">
						For example, hobbies, causes, industries, or
						curiosities.
					</p>
					<input
						className="input idea__input"
						id="inputInterest"
						name="inputInterest"
						type="text"
						value={interests}
						placeholder="Interests"
						onChange={handlechangeInterests}
					/>
				</div>
				<div className="idea__input-wrapper">
					<p className="idea__input-prompt">
						What would you like to work on in this project?
					</p>
					<p className="idea__input-subtitle">
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
						className="input idea__input"
					></input>
				</div>
				<div className="toggle">
					<div className="toggle__wrapper">
						<Toggle
							clickHandler={handleToggle}
							name="database"
						/>
						<p className="toggle__name">database</p>
					</div>
					<div className="toggle__wrapper">
						<Toggle clickHandler={handleToggle} name="API" />
						<p className="toggle__name">API</p>
					</div>
					<div className="toggle__wrapper">
						<Toggle
							clickHandler={handleToggle}
							name="user login"
						/>
						<p className="toggle__name">user login</p>
					</div>
					<div className="toggle__wrapper">
						<Toggle
							clickHandler={handleToggle}
							name="single-page application"
						/>
						<p className="toggle__name">
							single-page application
						</p>
					</div>
				</div>
				<div className="button__wrapper">
					<img
						className="button__navigate"
						onClick={() => {
							navigate(-1);
						}}
						src={orangeArrow}
						alt="arrow pointing left to go back"
					/>
					<input
						type="image"
						className="idea__button"
						src={blueArrow}
						onClick={getProjectIdea}
						alt="blue arrow pointing right for submit function"
					/>
				</div>
			</form>
		</div>
	);
}
