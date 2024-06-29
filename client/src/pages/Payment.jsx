import { Button } from "primereact/button";
import React from "react";
import axios from "axios";
function Payment() {
    const payment = async () => {
        let res = await axios.post("http://localhost:9999/payment");
        console.log(res);
        window.location.href = res.data.url;
    };
    return (
        <div>
            <Button onClick={payment}>Pay Now</Button>
        </div>
    );
}

export default Payment;
