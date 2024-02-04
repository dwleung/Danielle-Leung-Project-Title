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
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {
	// PROJECT IDEA RESULT
	const [projectIdea, setProjectIdea] = useState<Project>({
		id: "",
		title: "",
		description: "",
		requirements: [],
	});
	const baseUrl: string | undefined = process.env.REACT_APP_API_URL;

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isSignedUp, setIsSignedUp] = useState(false);

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
						path="/user"
						element={
							<UserPage
								baseUrl={baseUrl}
								isLoggedIn={isLoggedIn}
								isSignedUp={isSignedUp}
								setIsLoggedIn={setIsLoggedIn}
								setIsSignedUp={setIsSignedUp}
							/>
						}
					/>

					<Route
						path="user/login"
						element={
							<Login
								baseUrl={baseUrl}
								setState={setIsLoggedIn}
							/>
						}
					/>
					<Route
						path="user/signup"
						element={
							<Signup
								baseUrl={baseUrl}
								setState={setIsSignedUp}
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
