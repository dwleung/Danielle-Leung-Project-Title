import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Project } from "./utils/interfaces";
import HomePage from "./pages/HomePage/HomePage";
import IdeaPage from "./pages/GenerateIdeaPage/GenerateIdeaPage";
import IdeaDetailsPage from "./pages/IdeaDetailsPage/IdeaDetailsPage";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import Signup from "./components/Signup/Signup";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
	const baseUrl: string | undefined = process.env.REACT_APP_API_URL;
	// PROJECT IDEA RESULT
	const [projectIdea, setProjectIdea] = useState<Project>({
		idea_id: "",
		title: "",
		description: "",
		requirements: [],
	});
	const [isSignedUp, setIsSignedUp] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [chatHistory, setChatHistory] = useState<object[]>([]);
	const [ideaList, setIdeaList] = useState<Project[]>([]);
	const [saveIdeaOnLogin, setSaveIdeaOnLogin] = useState(false);

	return (
		<BrowserRouter>
			<div className="main">
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/idea"
						element={
							<IdeaPage
								setProjectIdea={setProjectIdea}
								baseUrl={baseUrl}
								chatHistory={chatHistory}
								setChatHistory={setChatHistory}
							/>
						}
					/>
					<Route
						path="/idea/details"
						element={
							<IdeaDetailsPage
								projectIdea={projectIdea}
								baseUrl={baseUrl}
								setSaveIdeaOnLogin={setSaveIdeaOnLogin}
							/>
						}
					/>
					<Route
						path="/user/login"
						element={
							<LoginPage
								baseUrl={baseUrl}
								setIsSignedUp={setIsSignedUp}
								setIsLoggedIn={setIsLoggedIn}
							/>
						}
					/>

					<Route
						path="/user/signup"
						element={
							<Signup
								baseUrl={baseUrl}
								setState={setIsSignedUp}
								setIsLoggedIn={setIsLoggedIn}
							/>
						}
					/>

					<Route
						path="/user"
						element={
							<UserProfile
								baseUrl={baseUrl}
								setState={setIsLoggedIn}
								ideaList={ideaList}
								setIdeaList={setIdeaList}
								saveIdeaOnLogin={saveIdeaOnLogin}
								setSaveIdeaOnLogin={setSaveIdeaOnLogin}
								projectIdea={projectIdea}
								setProjectIdea={setProjectIdea}
							/>
						}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
