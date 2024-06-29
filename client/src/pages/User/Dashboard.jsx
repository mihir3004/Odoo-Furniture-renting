import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchPost } from "../../apis/fetch";
import Swal from "sweetalert2";
function isValidSessionId(sessionId) {
  const regex = /^cs_test/;
  return regex.test(sessionId);
}

export const Dashboard = () => {
  const location = useLocation();
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
      Swal.fire({
        title: "Success",
        text: "Payment processed successfully",
        icon: "success",
      }).then(() => {
        navigate("/user"); // Navigate after showing the success message
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "There was an issue processing your payment",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    const session_id = queryParams.get("session_id");
    console.log(session_id);

    if (isValidSessionId(session_id)) {
      validatePayment();
    }
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
          <div className="font-semibold p-5 text-2xl">Total Added Item</div>
          <AnimatedCount finalCount={5} />
        </div>
      </div>
    </div>
  );
};
