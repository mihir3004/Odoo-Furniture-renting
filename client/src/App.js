import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import { PrimeReactProvider } from "primereact/api";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { loginLoader } from "./loaders/verifyLoader";
import { Header } from "./components/User/Header";
import { Dashboard } from "./pages/User/Dashboard";
import { Header as AdminHeader } from "./components/Admin/Header";
import { Dashboard as AdminDashboard } from "./pages/Admin/Dashboard";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Fail from "./pages/Fail";
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