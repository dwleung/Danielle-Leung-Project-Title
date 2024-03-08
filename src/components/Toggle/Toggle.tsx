import "./Toggle.scss";

interface ToggleProps {
	clickHandler: (e: any) => void;
	name: string;
}

export default function Toggle({ clickHandler, name }: ToggleProps) {
	return (
		<label className="switch">
			<input type="checkbox" onClick={clickHandler} name={name} />
			<span className="slider round"></span>
		</label>
	);
}
