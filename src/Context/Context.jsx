import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { error } from "../Components/Common/MessageDisplay/MessageDisplayTypes";

export const ApiContext = createContext();

export default function Context({children}) {
	const navigate = useNavigate();
	const currentYear = new Date().getFullYear();
	
	const [carsList, setCarsList] = useState([]);
	const [currentCar, setCurrentCar] = useState({name: "",year: currentYear});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [theme, setTheme] = useState(() => {
		const initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		document.documentElement.setAttribute("data-theme", initialTheme);
		return initialTheme;
	});

	const API_BASE = "http://localhost:3004";

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setCurrentCar((prev) => ({ ...prev, [name]: name === "year" ? Number(value) : value }));
	};
	
	const fetchCars = async () => {
		setIsLoading(true);
		setError(null);

		await axios.get(`${API_BASE}/cars`)
			.then((res) => {
				setCarsList(res.data);
			})
			.catch((err) => {
				setError({
					title: "Error Fetching Data",
					message: "There was an error while fetching data: " + err.message,
					typeName: "error",
					refreshButton: true
				});
				console.error("Fetching failed:", err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const loadCar = async (id) => {
		if (id !== undefined) {
			setIsLoading(true);
			await axios.get(`${API_BASE}/cars/${id}`)
			.then((res) => {
				setCurrentCar({ name: res.data.name, year: res.data.year });
			})
			.catch((err) => {
					setError({
					title: "Error Loading Data",
					message: "There was an error while loading car data: " + err.message,
					typeName: "error",
					refreshButton: true
				});
				console.error("Loading failed:", err);
			})
			.finally(() => {
				setIsLoading(false);
			})
		}
		else setCurrentCar({ name: "", year: currentYear });
	};

	const handleCreate = async () => {
		setIsLoading(true);
		await axios.post(`${API_BASE}/cars`, { name: currentCar.name, year: Number(currentCar.year) })
			.then(() => {
				setCurrentCar({name: "",year: currentYear});
				navigate("/cars");
			})
			.catch((err) => {
				setError({
					title: "Error Creating Data",
					message: "There was an error while creating data: " + err.message,
					typeName: "error",
					refreshButton: true
				});
				console.error("Create failed:", err);
			})
			.finally(() => {
				setIsLoading(false);
			})
	};

	const handleUpdate = async (id) => {
		setIsLoading(true);
		await axios.put(`${API_BASE}/cars/${id}`, { id: Number(id), name: currentCar.name, year: Number(currentCar.year) })
			.then(() => {
				setCurrentCar({name: "",year: currentYear});
				navigate("/cars");
			})
			.catch((err) => {
				setError({
					title: "Error Updating Data",
					message: "There was an error while updating car data: " + err.message,
					typeName: "error",
					refreshButton: true
				});
				console.error("Update failed:", err);
			})
			.finally (() => {
				setIsLoading(false);
			})
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Delete this car?")) return;
		await axios.delete(`${API_BASE}/cars/${id}`)
			.then(async () => {
				await fetchCars();
			})
			.catch((err) => {
				console.error("Delete failed:", err);
				alert("Delete failed");
			});
	};

	const clearError = () => {
		setError(null);
	};

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
	};

	const value = { 
		fetchCars, 
		handleInputChange, 
		loadCar, 
		handleUpdate, 
		handleCreate, 
		handleDelete,
		clearError, 
		toggleTheme,
		carsList, 
		currentCar, 
		isLoading, 
		error,
		theme,
		currentYear
	};

	return (
		<ApiContext value={value}>
			{children}
		</ApiContext>
	);
}