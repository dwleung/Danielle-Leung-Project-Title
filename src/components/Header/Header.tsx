import { Link } from "react-router-dom";
import ideallyLogo from "../../assets/logo/ideally-logo.svg";
import "./Header.scss";

export default function Header() {
	const activeClass = ({ isActive }: { isActive: boolean }) => {
		return isActive ? "header__link--active" : "";
	};

	return (
		<div className="header">
			<nav className="header__nav">
				<Link to="/" className={`header__link ${activeClass}`}>
					Home
				</Link>
				<Link
					to="/user"
					className={`header__link ${({
						isActive,
					}: {
						isActive: boolean;
					}) => (isActive ? "header__link--active" : "")}`}
				>
					Profile
				</Link>
				<Link
					to="/idea"
					className={`header__link ${({
						isActive,
					}: {
						isActive: boolean;
					}) => (isActive ? "header__link--active" : "")}`}
				>
					Idea
				</Link>
			</nav>
			<Link to="/">
				<img
					className="header__logo"
					src={ideallyLogo}
					alt="text ideally with idea in orange"
				></img>
			</Link>
		</div>
	);
}
