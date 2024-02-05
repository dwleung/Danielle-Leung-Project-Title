import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import IdeaPage from "./pages/GenerateIdeaPage/GenerateIdeaPage";
import IdeaDetailsPage from "./pages/IdeaDetailsPage/IdeaDetailsPage";
import { Project } from "./utils/interfaces";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import UserPage from "./pages/UserPage/UserPage";
import Signup from "./components/Signup/Signup";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
	// PROJECT IDEA RESULT
	const [projectIdea, setProjectIdea] = useState<Project>({
		id: "",
		title: "",
		description: "",
		requirements: [],
	});
	const baseUrl: string | undefined = process.env.REACT_APP_API_URL;

	const [isSignedUp, setIsSignedUp] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
							/>
						}
					/>
					<Route
						path="/idea/details"
						element={
							<IdeaDetailsPage
								projectIdea={projectIdea}
								baseUrl={baseUrl}
							/>
						}
					/>
					<Route
						path="/user/login"
						element={
							<UserPage
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
							/>
						}
					/>

					<Route
						path="/user"
						element={
							<UserProfile
								baseUrl={baseUrl}
								setState={setIsLoggedIn}
							/>
						}
					/>
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
