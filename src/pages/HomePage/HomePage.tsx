import React from "react";
import Typewriter from "typewriter-effect";
import "./HomePage.scss";
import orangeArrow from "../../assets/icons/orangeArrow.svg";
import ideallyLogo from "../../assets/logo/ideally-logo.svg";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
	const navigate = useNavigate();
	const options = {
		loop: true,
		cursor: "|",
		wrapperClassName: "home__title",
		cursorClassName: "home__title-cursor",
	};

	return (
		<div className="home">
			<Typewriter
				options={options}
				onInit={(typewriter: any) => {
					typewriter
						.typeString("ideally")
						.pauseFor(2000)
						.deleteAll()
						.typeString("capstone project")
						.pauseFor(2000)
						.deleteAll()
						.typeString("homebrew project")
						.pauseFor(2000)
						.deleteAll()
						.typeString("side project")
						.pauseFor(2000)
						.deleteAll()
						.typeString("a little something I made")
						.pauseFor(2000)
						.deleteAll()
						.start();
				}}
			/>
			<div className="home__tagline">
				<p>
					Sometimes, coming up with the idea is the hardest part.
				</p>
				<p className="home__tagline--bold">
					We'll do the idea work, so you can start building.{" "}
					<img
						className="home__logo"
						src={ideallyLogo}
						alt="ideally text with letters of idea in orange color"
					></img>
					.
				</p>
			</div>
			<div className="home__cta-wrapper">
				<img
					className="icon home__cta"
					src={orangeArrow}
					alt="button with arrow pointing right"
					onClick={() => {
						navigate("/idea");
					}}
				/>
				<p className="home__cta-label">Get started</p>
			</div>
		</div>
	);
}
