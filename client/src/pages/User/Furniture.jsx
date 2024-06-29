import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import statesData from "../../utils/states-and-districts.json";

const Furniture = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    if (selectedState) {
      const stateData = statesData.states.find(
        (state) => state.state === selectedState
      );
      setDistricts(stateData ? stateData.districts : []);
      setSelectedDistrict(null);
    }
  }, [selectedState]);

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
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Acme Fresh Start Housing"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <Link to={""}>
                <h2 class="text-lg font-semibold">Acme Fresh Start Housing</h2>
                <p class="text-gray-600">Chicago, IL</p>
              </Link>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x300"
              alt="A113 Transitional Housing"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <Link>
                <h2 class="text-lg font-semibold">A113 Transitional Housing</h2>
                <p class="text-gray-600">Santa Monica, CA</p>
              </Link>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Warm Beds Housing Support"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <Link>
                <h2 class="text-lg font-semibold">Warm Beds Housing Support</h2>
                <p class="text-gray-600">Juneau, AK</p>
              </Link>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Homesteady Housing"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <Link>
                <h2 class="text-lg font-semibold">Homesteady Housing</h2>
                <p class="text-gray-600">Chicago, IL</p>
              </Link>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Happy Homes Group"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <Link>
                <h2 class="text-lg font-semibold">Happy Homes Group</h2>
                <p class="text-gray-600">Gary, IN</p>
              </Link>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Hopeful Apartment Group"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <Link>
                <h2 class="text-lg font-semibold">Hopeful Apartment Group</h2>
                <p class="text-gray-600">Oakland, CA</p>
              </Link>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Seriously Safe Towns"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <Link>
                <h2 class="text-lg font-semibold">Seriously Safe Towns</h2>
                <p class="text-gray-600">Oakland, CA</p>
              </Link>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Capital Safe Towns"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <Link>
                <h2 class="text-lg font-semibold">Capital Safe Towns</h2>
                <p class="text-gray-600">Portland, OR</p>
              </Link>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Hopeful Housing Solutions"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <Link to={""}>
                <h2 class="text-lg font-semibold">Hopeful Housing Solutions</h2>
                <p class="text-gray-600">Oakland, CA</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Furniture;
