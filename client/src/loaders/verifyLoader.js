import { redirect } from "react-router-dom";
import { fetchGet } from "../apis/fetch";
export const loginLoader = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || !role) {
        return null;
    } else {
        return redirect("/" + role.toLowerCase());
    }
};
export const verifyLoader = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || !role) {
        return redirect("/");
    } else {
        return redirect("/" + role.toLowerCase());
    }
};
