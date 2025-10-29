import NavButton from '../Common/NavButton/NavButton';
import { primary } from '../Common/NavButton/NavButtonTypes';
import './HomePage.css';

function HomePage() {
    return ( 
        <div className="home-container card">
            <h2>Welcome to Cars Manager</h2>
            <p>
                This simple web app allows you to manage your car database —
                add, edit, and delete cars in just a few clicks.
            </p>
            <p>
                The data is stored in a local JSON file using <b>json-server</b>,
                and the interface is built entirely with React functional components.
            </p>
            <div className="home-actions">
                <NavButton to="/cars" typeName={primary}>View Cars</NavButton>
                <NavButton to="/cars/add" typeName={primary}>Add New Car</NavButton>
            </div>
        </div>
    );
}

export default HomePage;