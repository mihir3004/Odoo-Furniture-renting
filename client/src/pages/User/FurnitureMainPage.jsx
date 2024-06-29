import { useParams } from "react-router-dom";
import { fetchGet } from "../../apis/fetch";
import { useEffect, useState } from "react";
import Payment from "../Payment";

const FurnitureMainPage = () => {
  const urlParams = useParams();
  console.log(urlParams);
  const [furniture, setFurniture] = useState([]);
  const [loading, setloading] = useState(false);

  async function getAllFurniture() {
    const response = await fetchGet(
      `furniture/getFurniture?_id=${urlParams.name}`,
      localStorage.getItem("token")
    );
    if (response.status == "success") {
      setFurniture(response.furnitures);
      setloading(true);
    }
    console.log(response);
  }
  useEffect(() => {
    getAllFurniture();
    return () => {};
  }, []);
  return (
    loading && (
      <div>
        <div class="container mx-auto p-8">
          <div class="flex flex-col lg:flex-row items-center lg:items-start">
            <div class="flex-1 p-4">
              <h1 class="text-4xl font-bold text-black mb-4">
                Name: {furniture[0].name}
              </h1>
              <p class="text-lg text-gray-500 flex items-center mb-4">
                Location: {furniture[0].ownerId.district},{" "}
                {furniture[0].ownerId.state}
              </p>
              <p class="text-black-600 font-semibold mb-4">
                Description: {furniture[0].description}
              </p>
              <p class="text-xl text-gray-900 font-bold mb-6">
                Price: $ {furniture[0].rentalPrice / 100}
              </p>
              <Payment furniture={furniture[0]}></Payment>
            </div>
            <div class="flex-1 p-4 flex justify-center items-center">
              <img
                src={`http://localhost:9999/uploads/${furniture[0].images[0]}`}
                alt="Furniture Image"
                class="w-auto h-96 max-w-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FurnitureMainPage;
