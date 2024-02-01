import react from "react";
import Typewriter from "typewriter-effect";

export default function HomePage() {
	const options = {
		loop: true,
		cursor: "|",
		wrapperClassName: "Typewriter_wrapper",
	};

	return (
		<>
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
		</>
	);
}
