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
            `furniture/getAll?_id=${urlParams.name}`,
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
            <div class="bg-gray-100">
                <div class="container mx-auto p-4">
                    <div class="flex flex-col lg:flex-row">
                        <div class="flex-1 p-4">
                            <h1 class="text-4xl font-bold mb-2">
                                {furniture[0].name}
                            </h1>
                            <p class="text-lg text-gray-700 mb-4">
                                <i class="fas fa-map-marker-alt"></i>{" "}
                                {furniture[0].ownerId.district},
                                {furniture[0].ownerId.state}
                            </p>
                            <p class="text-blue-600 font-semibold mb-4">
                                {furniture[0].description}
                            </p>
                            <p class="text-lg text-gray-700 mb-4">
                                {furniture[0].rentalPrice / 100}
                            </p>
                            <Payment furniture={furniture[0]}></Payment>
                        </div>
                        <div class="flex-1 p-4">
                            <img
                                src={`http://localhost:9999/uploads/${furniture[0].images[0]}`}
                                alt="Acme Fresh Start Housing"
                                class="w-full h-auto object-cover rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default FurnitureMainPage;
