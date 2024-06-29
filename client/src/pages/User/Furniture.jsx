import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import statesData from "../../utils/states-and-districts.json";
import { fetchGet } from "../../apis/fetch";

const Furniture = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [furniture, setFurniture] = useState([]);

  useEffect(() => {
    if (selectedState) {
      const stateData = statesData.states.find(
        (state) => state.state === selectedState
      );
      setDistricts(stateData ? stateData.districts : []);
      setSelectedDistrict(null);
    }
  }, [selectedState]);
  async function getAllFurniture() {
    const response = await fetchGet(
      "furniture/getAll",
      localStorage.getItem("token")
    );
    if (response.status == "success") {
      setFurniture(response.furnitures);
    }
    console.log(response);
  }
  useEffect(() => {
    getAllFurniture();
    return () => {
      // Cleanup logic here (e.g., unsubscribe from event listeners, clear timeouts/intervals)
    };
  }, []);

  const cities = [
    { name: "Chicago", code: "CHI" },
    { name: "Santa Monica", code: "SM" },
    { name: "Juneau", code: "JUN" },
    { name: "Gary", code: "GAR" },
    { name: "Oakland", code: "OAK" },
    { name: "Portland", code: "POR" },
  ];

  return (
    <main class="bg-gray-100">
      <div class="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search Furniture"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex-1">
            <MultiSelect
              value={selectedCities}
              options={cities}
              onChange={(e) => setSelectedCities(e.value)}
              optionLabel="name"
              placeholder="Select Cities"
              display="chip"
              maxSelectedLabels={3}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <Dropdown
              value={selectedState}
              options={statesData.states.map((state) => ({
                label: state.state,
                value: state.state,
              }))}
              onChange={(e) => setSelectedState(e.value)}
              placeholder="Select a State"
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <Dropdown
              value={selectedDistrict}
              options={districts.map((district) => ({
                label: district,
                value: district,
              }))}
              onChange={(e) => setSelectedDistrict(e.value)}
              placeholder="Select a District"
              className="w-full"
              disabled={!selectedState}
            />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {furniture.map((item, index) => (
            <div
              class="bg-white rounded-lg shadow-lg overflow-hidden"
              key={index}
            >
              <img
                src={`http://localhost:9999/uploads/${item.images[0]}`}
                class="w-full h-48 object-contain"
                alt="Image from Google Drive"
              />

              <div class="p-4">
                <Link to={`${item._id}`}>
                  <h2 class="text-lg font-semibold">{item.name}</h2>
                  <p class="text-gray-600">{item.description}</p>
                  <p class="text-gray-600">Rent Price : {item.rentalPrice}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Furniture;
