import { Link } from "react-router";
import "./NavButton.css";

function NavButton({typeName = "primary", to, onClick, children, ...rest}) {
    const className= "btn " + typeName;

    if (to) {
        return (
            <Link to={to} className={className} {...rest}>
                {children}
            </Link>
        );
    }

    if (onClick) {
        return (
            <button onClick={onClick} className={className} {...rest}>
                {children}
            </button>
        );
    }

    return (
        <button className={className} {...rest}>
            {children}
        </button>
    );
}

export default NavButton;