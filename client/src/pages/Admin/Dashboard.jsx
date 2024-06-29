import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGet, fetchPost } from "../../apis/fetch";
import Furniture from "../User/Furniture";

export const Dashboard = () => {
  const [data, setdata] = useState({});
  const [visible, setvisible] = useState(false);
  const navigate = useNavigate();

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
          <div className="font-semibold p-5 text-2xl">Total Earning</div>
          <AnimatedCount finalCount={50} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">Sells Count</div>
          <AnimatedCount finalCount={50} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">Total Category</div>
          <AnimatedCount finalCount={50} />
        </div>
      </div>
    </div>
  );
};
