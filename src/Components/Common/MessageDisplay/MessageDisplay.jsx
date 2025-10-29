import { useNavigate } from "react-router";
import NavButton from "../NavButton/NavButton";
import { primary, secondary } from "../NavButton/NavButtonTypes";
import { info, notfound, error, warning } from "./MessageDisplayTypes";
import "./MessageDisplay.css";

function MessageDisplay({ title = "Information", message, typeName = info, refreshButton = false }) {
	const navigate = useNavigate();

	const icon = (() => {
		switch(typeName) {
			case notfound: return "🚧";
			case warning: return "⚠️";
			case error: return "❌";
			default: return "❕";
		}
	})();

	return (
		<div className={`message-display-container card ${typeName}`}>
			<div className="message-icon">{icon}</div>
			<h2 className="message-title">{title}</h2>
			{message && <p className="message-message">{message}</p>}

			<div className="message-actions">
				{refreshButton && 
					<NavButton onClick={() => navigate(0)} typeName={primary}>
						Try Again
					</NavButton>
				}
				<NavButton onClick={() => navigate(-1)} typeName={secondary}>
					Go Back
				</NavButton>
				<NavButton to="/" typeName={primary}>
					Home
				</NavButton>
			</div>
		</div>
	);
}

export default MessageDisplay;
