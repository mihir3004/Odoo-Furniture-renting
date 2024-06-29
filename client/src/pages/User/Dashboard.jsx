import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchPost } from "../../apis/fetch";
// function isValidSessionId(sessionId) {
//   const regex = /^cs_test_[A-Za-z0-9]{40}$/;
//   return regex.test(sessionId);
// }
export const Dashboard = () => {
  const [data, setdata] = useState({});
  const [visible, setvisible] = useState(false);
  const location = useLocation(); // Get the location object
  const navigate = useNavigate();

  const getQueryParams = () => {
    return new URLSearchParams(location.search);
  };

  const validatePayment = async () => {
    const furniture = JSON.parse(localStorage.getItem("furniture"));

    const data = {
      user: localStorage.getItem("id"),
      furniture: furniture._id,
      totalAmount: furniture.rentalPrice,
      endDate: Date.now(),
      buyerId: localStorage.getItem("id"),
      sellerId: furniture.ownerId._id,
      amount: furniture.rentalPrice,
    };

    const res = await fetchPost(
      "payment/addPayment",
      localStorage.getItem("token"),
      JSON.stringify(data)
    );
    console.log(res);
    if (res.status === "success") {
      navigate("/user");
    }
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    const session_id = queryParams.get("session_id");
    console.log(session_id);

    // if (isValidSessionId(session_id)) {
    validatePayment();
    // }
  }, [location.search]);

  const AnimatedCount = ({ finalCount }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const animationDuration = 500; // in milliseconds
      const steps = finalCount;
      const stepDuration = animationDuration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        if (currentStep <= steps) {
          setCount(currentStep);
          currentStep += 1;
        } else {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, [finalCount]);

    return <div className="font-bold p-3 text-4xl">{count}</div>;
  };
  return (
    <div className="m-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 grid-rows-3">
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">Total Students</div>
          <AnimatedCount finalCount={50} />
        </div>
      </div>
    </div>
  );
};
