import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import { PrimeReactProvider } from "primereact/api";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { loginLoader, verifyLoader } from "./loaders/verifyLoader";
import { Header } from "./components/User/Header";
import { Dashboard } from "./pages/User/Dashboard";
import { Header as AdminHeader } from "./components/Admin/Header";
import { Dashboard as AdminDashboard } from "./pages/Admin/Dashboard";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Fail from "./pages/Fail";
import Furniture from "./pages/User/Furniture";
import FurnitureMainPage from "./pages/User/FurnitureMainPage";
import SellItem from "./pages/User/SellItem";
import PaymentPage from "./pages/Admin/PaymentPage";
import Analysis from "./pages/Admin/Analysis";
import Profile from "./pages/User/Profile";
const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
            loader: loginLoader,
            errorElement: <ErrorPage />,
        },
        {
            path: "/register",
            element: <Register />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/user",
            element: <Header />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "",
                    element: <Dashboard />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "furniture",
                    element: <Furniture />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "profile",
                    element: <Profile />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "furniture/:name",
                    element: <FurnitureMainPage />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "sell",
                    element: <SellItem />,
                    errorElement: <ErrorPage />,
                },
            ],
        },
        {
            path: "/admin",
            element: <AdminHeader />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "",
                    element: <AdminDashboard />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "payment",
                    element: <PaymentPage />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "analysis",
                    element: <Analysis />,
                    errorElement: <ErrorPage />,
                },
            ],
        },

        {
            path: "payment",
            element: <Payment />,
        },
        {
            path: "success",
            element: <Success />,
        },
        {
            path: "fail",
            element: <Fail />,
        },
    ]);

    return (
        <PrimeReactProvider>
            <RouterProvider router={router}></RouterProvider>
        </PrimeReactProvider>
    );
};

export default App;
