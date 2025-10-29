import { BrowserRouter } from 'react-router'
import Context from './Context/Context.jsx'
import { Router } from './Router/Router.jsx'
import './App.css'

function App() {
	return (
		<BrowserRouter>
			<Context>
				{ Router }
			</Context>
		</BrowserRouter>
	)
}

export default App
