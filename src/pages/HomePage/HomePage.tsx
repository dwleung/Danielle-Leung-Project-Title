import react from "react";
import Typewriter from "typewriter-effect";
import "./HomePage.scss";
import arrowIcon from "../../assets/icons/arrow.svg";

export default function HomePage() {
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
						.typeString("Project Title")
						.pauseFor(2000)
						.deleteAll()
						.typeString("Capstone Project")
						.pauseFor(2000)
						.deleteAll()
						.typeString("Homebrew Project")
						.pauseFor(2000)
						.deleteAll()
						.typeString("Side Project")
						.pauseFor(2000)
						.deleteAll()
						.typeString("A little something I made")
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
					We'll do the idea work, so you can start building.
				</p>
			</div>
			<img
				className="icon home__image"
				src={arrowIcon}
				alt="button with arrow pointing downwards"
			/>
		</div>
	);
}
