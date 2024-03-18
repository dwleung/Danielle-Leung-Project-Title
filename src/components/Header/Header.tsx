import { NavLink, Link } from "react-router-dom";
import ideallyLogo from "../../assets/logo/ideally-logo.svg";
import React from "react";
import "./Header.scss";

export default function Header() {
	// const activeClass = ({ isActive }: { isActive: boolean }) => {
	// 	return isActive ? "header__link--active" : ""};

	return (
		<div className="background">
			<div className="header">
				<nav className="nav">
					<NavLink to="/" className="nav__link">
						<li>Home</li>
					</NavLink>
					<NavLink
						to="/user"
						className="nav__link"
					>
						<li>Profile</li>
					</NavLink>
					<NavLink
						to="/idea"
						className="nav__link"
					>
						<li>Idea</li>
					</NavLink>
				</nav>
				<Link to="/">
					<img
						className="header__logo"
						src={ideallyLogo}
						alt="text ideally with idea in orange"
					></img>
				</Link>
			</div>
		</div>
	);
}
