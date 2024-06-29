import { Button } from "primereact/button";
import React from "react";
import axios from "axios";
function Payment({ furniture }) {
  const payment = async () => {
    // console.log(furniture);
    localStorage.setItem("furniture", JSON.stringify(furniture));
    let res = await axios.post("http://localhost:9999/payment", {
      amount: furniture.rentalPrice,
      name: furniture.name,
    });
    console.log(res);
    window.location.href = res.data.url;
  };
  return (
    <div>
      <Button size="large" className="bg-green-500" onClick={payment}>
        Pay Now
      </Button>
    </div>
  );
}

export default Payment;
