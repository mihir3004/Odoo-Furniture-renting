import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="text-white font-bold text-9xl mb-4">404</div>
      <div className="text-white text-3xl mb-8">Oops! Page not found</div>
      <Link
        className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg0"
        to={"/"}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
