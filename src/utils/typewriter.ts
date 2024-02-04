const loadingText = [
	"Summoning intergalactic unicorns to power up the warp drive...",
	"Brewing a potion of infinite patience..",
	"Tickling the code monkeys to speed things up...",
	"Enticing the hamsters to run a little faster...",
	"Assembling a team of pixelated superheroes to save the day...",
	"Sending carrier pigeons with your data to the cloud...",
	"Teaching binary code how to dance...",
	"Tickling the loading bar to make it giggle...",
	"Convincing the electrons to sprint...",
	"Training quantum particles to multitask...",
	"Coaxing the bits and bytes to align for a perfect loading sequence...",
	"Hitching a ride on shooting stars to fetch your data...",
	"Playing hide and seek with the loading progress bar...",
	"Convincing the virtual gerbils to run in a synchronized marathon...",
	"Activating a fidget spinner...",
	"Summoning digital fairies to sprinkle magic dust...",
	"Engaging in a rap battle with the algorithm...",
	"Juggling ones and zeros...",
	"Convincing the code to do the Macarena...",
	"Sending carrier pigeons with love notes to your device...",
	"Coaxing sleepy server dragons to breathe fire...",
	"In a heated debate with gravity to make your data rise faster...",
	"Chugging coffee so loading feels faster...",
	"Setting up a pixelated orchestra for a symphony of loading...",
	"Coordinating a synchronized swim routine for the progress bar...",
	"Negotiating with the binary code for a compromise...",
	"Putting loading cookies in the oven...",
	"Enlisting the help of digital ninjas for a stealthy operation...",
	"Exercising diplomacy with the server overloards...",
];

//Generate random string from array
const getRandomText = () => {
	const randomIndex = Math.floor(Math.random() * loadingText.length);
	return loadingText[randomIndex];
};

const options = {
	loop: true,
	cursor: "|",
	wrapperClassName: "typewriter__loading-text",
	cursorClassName: "typewriter__cursor",
};

export { loadingText, getRandomText, options };
