import React from "react";
import { CiUser } from "react-icons/ci";
const Profile = () => {
    const userProfile = {
        username: "john_doe123",
        fullName: "John Doe",
        email: "john.doe@example.com",
        contactNumber: "+1234567890",
        stripeId: "stripe_user_id",
        state: "New York",
        district: "Manhattan",
        bio: "A software engineer passionate about web development.",
        avatarUrl: "https://example.com/avatar.jpg",
        website: "https://johndoe.com",
        joinedDate: "June 2020",
    };

    return (
        <div className=" min-w-96 mx-auto m-32 p-8 bg-white shadow-lg rounded-lg">
            <div className="flex ">
                <CiUser height={100} width={100} className=" h-16 w-16" />
                <div className="m-auto">
                    <h2 className="text-xl font-bold">
                        Name : {userProfile.fullName}
                    </h2>
                </div>
            </div>
            <ul className="mt-4">
                <li className="flex items-center mb-2">
                    <span className="text-gray-700">{userProfile.email}</span>
                </li>
                <li className="flex items-center mb-2">
                    <span className="text-gray-700">
                        {userProfile.contactNumber}
                    </span>
                </li>
                <li className="flex items-center mb-2">
                    <span className="text-gray-700">
                        {userProfile.stripeId}
                    </span>
                </li>
                <li className="flex items-center mb-2">
                    <span className="text-gray-700">
                        {userProfile.state}, {userProfile.district}
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default Profile;
