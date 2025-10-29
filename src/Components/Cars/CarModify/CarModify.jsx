import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ApiContext } from "../../../Context/Context";
import Loader from "../../Common/Loader/Loader";
import MessageDisplay from "../../Common/MessageDisplay/MessageDisplay";
import Input from "../../Common/Input/Input";
import NavButton from "../../Common/NavButton/NavButton";
import { primary, secondary } from "../../Common/NavButton/NavButtonTypes";
import "./CarModify.css";

function CarModify() {
	const { id } = useParams();
	const navigate = useNavigate();
	const {
		currentCar,
		handleInputChange,
		handleCreate,
		handleUpdate,
		loadCar,
		isLoading,
		error,
		clearError,
		currentYear
	} = useContext(ApiContext);

	useEffect(() => {
		clearError();
		loadCar(id);
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (id !== undefined) await handleUpdate(id);
		else await handleCreate();
	};

	if (isLoading) return <Loader />;
	if (error) return (
			<MessageDisplay
				title={error.title}
				message={error.message}
				typeName={error.typeName}
				refreshButton={error.refreshButton}
			/>
		);
	return (
		<div className="car-modify card">
			<h2>{id !== undefined ? "Edit Car" : "Add New Car"}</h2>
			<form onSubmit={handleSubmit}>
				<Input
					label="Name:"
					name="name"
					value={currentCar.name}
					onChange={handleInputChange}
					required
				/>
				<Input
					label="Year:"
					name="year"
					type="number"
					value={currentCar.year}
					onChange={handleInputChange}
					min="1800"
					max={currentYear}
					step="1"
					required
				/>

				<div className="modify-actions">
					<NavButton typeName={primary} type="submit">
						{id ? "Save Changes" : "Add Car"}
					</NavButton>
					<NavButton typeName={secondary} onClick={() => navigate(-1)} type="button">
						Cancel
					</NavButton>
				</div>
			</form>
		</div>
	);
}

export default CarModify;
