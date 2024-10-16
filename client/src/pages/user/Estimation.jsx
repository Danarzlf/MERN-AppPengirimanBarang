import { useState, useContext } from "react";
import axios from "axios";
import { CityContext } from "../../context/CityContext";
import NavBarNormal from "../../components/NavBar/NavBarNormal";
import Footer from "../../components/Footer/Footer";
import EstimationModal from "../../components/Modals/EstimationModal";
import { API_ENDPOINT } from "../../utils/api-endpoint";

const Estimation = () => {
    const { cities, isLoading, error } = useContext(CityContext);
    const [inputOrigin, setInputOrigin] = useState("");
    const [suggestedOriginCities, setSuggestedOriginCities] = useState([]);
    const [inputDestination, setInputDestination] = useState("");
    const [suggestedDestinationCities, setSuggestedDestinationCities] = useState([]);
    const [weight, setWeight] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [length, setLength] = useState("");
    const [estimatedCost, setEstimatedCost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [useVolume, setUseVolume] = useState(false);
    const [deliveryService, setDeliveryService] = useState("REGULER"); // Default delivery service

    const handleVolumeChange = (e) => {
        setUseVolume(e.target.checked);
    };

    const handleOriginInputChange = (event) => {
        const value = event.target.value;
        setInputOrigin(value);

        if (Array.isArray(cities.data) && value.trim() !== "") {
            const filteredCities = cities.data.filter(city =>
                city.nameCity.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestedOriginCities(filteredCities);
        } else {
            setSuggestedOriginCities([]);
        }
    };

    const handleOriginCitySelect = (city) => {
        setInputOrigin(city.nameCity);
        setSuggestedOriginCities([]);
    };

    const handleDestinationInputChange = (event) => {
        const value = event.target.value;
        setInputDestination(value);

        if (Array.isArray(cities.data) && value.trim() !== "") {
            const filteredCities = cities.data.filter(city =>
                city.nameCity.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestedDestinationCities(filteredCities);
        } else {
            setSuggestedDestinationCities([]);
        }
    };

    const handleDestinationCitySelect = (city) => {
        setInputDestination(city.nameCity);
        setSuggestedDestinationCities([]);
    };

    const handleWeightChange = (event) => {
        const value = event.target.value;
        setWeight(value);
    };

    const handleWidthChange = (event) => {
        setWidth(event.target.value);
    };

    const handleHeightChange = (event) => {
        setHeight(event.target.value);
    };

    const handleLengthChange = (event) => {
        setLength(event.target.value);
    };

    const handleDeliveryServiceChange = (event) => {
        setDeliveryService(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!inputOrigin || !inputDestination || !weight) {
            console.error('All fields are required.');
            return;
        }

        const requestData = {
            fromCity: inputOrigin, // Use city name for origin
            toCity: inputDestination, // Use city name for destination
            weight: weight,
            height: useVolume ? height : undefined,
            width: useVolume ? width : undefined,
            length: useVolume ? length : undefined,
            deliveryService // Include the selected delivery service
        };

        try {
            const response = await axios.post(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.ESTIMATE_COST_BY_CITY_NAME}`, requestData);
            const { data } = response.data;
            setEstimatedCost(data.estimatedCost);
            setShowModal(true);
        } catch (error) {
            console.error('Error estimating cost:', error);
        }
    };

    return (
        <>
            <div className="droppoint-title mb-4">
                <h1 className="mb-4">Estimasi Harga</h1>
                <p>Home &gt; Estimasi Harga</p>
            </div>
            <div className="container mt-5">
                <h4>Estimasi Harga</h4>
                <p>Hitung estimasi biaya pengiriman paket dari daerahmu</p>
                <div className="card mb-3 p-5">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <label className="form-label">Asal</label>
                                </div>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={inputOrigin}
                                        onChange={handleOriginInputChange}
                                    />
                                    {suggestedOriginCities.length > 0 && (
                                        <ul className="list-group mt-2">
                                            {suggestedOriginCities.map(city => (
                                                <li
                                                    key={city._id}
                                                    className="list-group-item"
                                                    onClick={() => handleOriginCitySelect(city)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {city.nameCity}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <label className="form-label">Tujuan</label>
                                </div>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={inputDestination}
                                        onChange={handleDestinationInputChange}
                                    />
                                    {suggestedDestinationCities.length > 0 && (
                                        <ul className="list-group mt-2">
                                            {suggestedDestinationCities.map(city => (
                                                <li
                                                    key={city._id}
                                                    className="list-group-item"
                                                    onClick={() => handleDestinationCitySelect(city)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {city.nameCity}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <label className="form-label">Berat</label>
                                </div>
                                <div className="col-sm-9">
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={weight}
                                        onChange={handleWeightChange}
                                    />
                                </div>
                            </div>

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="volumeCheckbox"
                                    checked={useVolume}
                                    onChange={handleVolumeChange}
                                />
                                <label className="form-check-label" htmlFor="volumeCheckbox">
                                    <p style={{ fontSize: "13px" }}>Pakai Volume</p>
                                </label>
                            </div>

                            {useVolume && (
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Panjang<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={length}
                                                onChange={handleLengthChange}
                                            />
                                            <span className="input-group-text">cm</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Lebar<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={width}
                                                onChange={handleWidthChange}
                                            />
                                            <span className="input-group-text">cm</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Tinggi<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={height}
                                                onChange={handleHeightChange}
                                            />
                                            <span className="input-group-text">cm</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <label className="form-label">Layanan Pengiriman</label>
                                </div>
                                <div className="col-sm-9">
                                    <select
                                        className="form-select"
                                        value={deliveryService}
                                        onChange={handleDeliveryServiceChange}
                                    >
                                        <option value="REGULER">Reguler</option>
                                        <option value="NEXTDAY">Next Day</option>
                                        <option value="CARGO">Cargo</option>
                                        <option value="SAMEDAY">Same Day</option>
                                    </select>
                                </div>
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn" style={{ backgroundColor: "var(--main-color)", border: "none", color:"white" }}>
                                    Cek Ongkir
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {showModal && (
                <EstimationModal
                    onClose={() => setShowModal(false)}
                    estimatedCost={estimatedCost}
                    show={showModal}
                />
            )}

            <NavBarNormal />
            <Footer />
        </>
    );
};

export default Estimation;
