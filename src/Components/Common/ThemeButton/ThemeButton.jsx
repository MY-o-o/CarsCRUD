import { useContext } from "react";
import { ApiContext } from "../../../Context/Context";
import "./ThemeButton.css";

function ThemeButton() {
	const { theme, toggleTheme } = useContext(ApiContext);

    return ( 
        <div className="theme-switch">
			<input
				type="checkbox"
				id="theme-toggle"
				className="theme-toggle-checkbox"
				checked={theme === "dark"}
				onChange={toggleTheme}
			/>
			<label htmlFor="theme-toggle" className="theme-toggle-label">
				<span className="sun">☀️</span>
				<span className="moon">🌙</span>
			</label>
		</div>
	);
}

export default ThemeButton;