import { NavLink } from "react-router";
import ThemeButton from "../../Common/ThemeButton/ThemeButton";
import "./Header.css";

function Header() {

	return (
		<header className="header">
			<div className="header-logo">
				<img
					src="/Icons/car-icon.png"
					alt="Car Logo"
					className="header-logo-image"
				/> 
				Cars Manager
			</div>
			<div className="wrapper-right">
				<nav className="header-nav">
					<NavLink
						to="/"
						className={({ isActive }) =>
							"header-link" + (isActive ? " active" : "")
						}
						end
					>
						Home
					</NavLink>
					<NavLink
						to="/cars" end
						className={({ isActive }) =>
							"header-link" + (isActive ? " active" : "")
						}
					>
						Cars
					</NavLink>
					<NavLink
						to="/cars/add"
						className={({ isActive }) =>
							"header-link" + (isActive ? " active" : "")
						}
					>
						Add Car
					</NavLink>
				</nav>
				<ThemeButton />
			</div>
		</header>
	);
}

export default Header;
