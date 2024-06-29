import { useParams } from "react-router-dom";
import { fetchGet } from "../../apis/fetch";
import { useEffect, useState } from "react";

const FurnitureMainPage = () => {
  const urlParams = useParams();
  const [furniture, setFurniture] = useState([]);

  async function getAllFurniture() {
    const response = await fetchGet(
      `furniture/getAll?_id=${urlParams.name}`,
      localStorage.getItem("token")
    );
    if (response.status == "success") {
      setFurniture(response.furnitures);
    }
    console.log(response);
  }
  useEffect(() => {
    getAllFurniture();
    return () => {};
  }, []);
  return (
    <div class="bg-gray-100">
      <div class="container mx-auto p-4">
        <div class="flex flex-col lg:flex-row">
          <div class="flex-1 p-4">
            <h1 class="text-4xl font-bold mb-2">Acme Fresh Start Housing</h1>
            <p class="text-lg text-gray-700 mb-4">
              <i class="fas fa-map-marker-alt"></i> Chicago, IL
            </p>
            <p class="text-blue-600 font-semibold mb-4">
              About this housing location
            </p>
            <ul class="mb-4">
              <li>Units available: 4</li>
              <li>Does this location have wifi: true</li>
              <li>Does this location have laundry: true</li>
            </ul>
            <h2 class="text-2xl font-semibold mb-2">Apply now to live here</h2>
            <form class="bg-white p-4 rounded shadow-md">
              <div class="mb-4">
                <label class="block text-gray-700">First Name</label>
                <input
                  type="text"
                  class="w-full border border-gray-300 p-2 rounded mt-1"
                  placeholder="First Name"
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  class="w-full border border-gray-300 p-2 rounded mt-1"
                  placeholder="Last Name"
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">Email</label>
                <input
                  type="email"
                  class="w-full border border-gray-300 p-2 rounded mt-1"
                  placeholder="Email"
                />
              </div>
              <button class="px-4 py-2 bg-blue-600 text-white rounded">
                Apply now
              </button>
            </form>
          </div>
          <div class="flex-1 p-4">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Acme Fresh Start Housing"
              class="w-full h-auto object-cover rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureMainPage;
