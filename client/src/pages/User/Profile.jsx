import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { fetchGet } from "../../apis/fetch";
const Profile = () => {
    const [user, setUser] = useState([]);
    const [loading, setloading] = useState(false);
    const fetchProfile = async () => {
        const res = await fetchGet(
            "auth/getprofile?id=" + localStorage.getItem("id"),
            localStorage.getItem("token")
        );
        setUser(res.all);
        setloading(true);
        console.log(user);
    };
    useEffect(() => {
        fetchProfile();

        return () => {};
    }, []);

    return (
        loading && (
            <div className=" min-w-96 mx-auto m-32 p-8 bg-white shadow-lg rounded-lg">
                <div className="flex ">
                    <CiUser height={100} width={100} className=" h-16 w-16" />
                </div>
                <ul className="mt-4">
                    <li className="flex items-center mb-2">
                        <span className="text-gray-700">{user[0].email}</span>
                    </li>
                    <li className="flex items-center mb-2">
                        <span className="text-gray-700">{user[0].contact}</span>
                    </li>
                    <li className="flex items-center mb-2">
                        <span className="text-gray-700">
                            {user[0].stripeId}
                        </span>
                    </li>
                    <li className="flex items-center mb-2">
                        <span className="text-gray-700">
                            {user[0].state}, {user[0].district}
                        </span>
                    </li>
                </ul>
            </div>
        )
    );
};

export default Profile;
