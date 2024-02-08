import "./Footer.scss";
import footerText from "../../assets/images/footer.svg";

export default function Footer() {
	return (
		<div className="footer">
			<img
				className="footer__text"
				src={footerText}
				alt="styled text 'made by danielle leung'"
			/>
		</div>
	);
}
