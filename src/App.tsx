import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import IdeaPage from "./pages/GenerateIdeaPage/GenerateIdeaPage";
import IdeaDetailsPage from "./pages/IdeaDetailsPage/IdeaDetailsPage";
import { Project } from "./utils/interfaces";

function App() {
	// PROJECT IDEA RESULT

	const [projectIdea, setProjectIdea] = useState<Project>({
		title: "",
		description: "",
		requirements: [],
	});

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/idea"
					element={<IdeaPage setProjectIdea={setProjectIdea} />}
				/>
				<Route
					path="/idea/details"
					element={<IdeaDetailsPage projectIdea={projectIdea} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
