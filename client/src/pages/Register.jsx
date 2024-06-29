import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { baseUrl } from "../Config/baseUrl";
import { RegisterValidationSchemas } from "../Schemas/RegisterValidation";
const initialValues = {
  Email: "",
  Password: "",
};

const Register = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: RegisterValidationSchemas,
      onSubmit: (values, action) => {
        console.log(values);

        action.resetForm();
      },
    });
  return (
    <>
      <div className="min-h-screen rounded-sm border border-stroke bg-[#EEEEEE] shadow-default dark:border-strokedark dark:bg-boxdark ">
        <div className="flex flex-wrap items-center m-4">
          <div className="hidden w-full xl:block xl:w-1/2 min-h-screen m-auto justify-center items-center ">
            <div className="py-[10.375rem] px-[6.5rem] text-center ">
              {/* <Link className=" inline-block" to=""></Link> */}

              <span className="inline-block mx-auto">
                {<img src="" alt="symbol" />}
              </span>
            </div>
          </div>

          <div className="w-full border-stroke rounded-2xl bg-blue-500 dark:border-strokedark xl:w-1/2 xl:border-l-2 ">
            <div className="w-full p-4 sm:p-[3.125rem] xl:p-[4.375rem]">
              {/* <span className="mb-1.5 block font-medium">Start for free</span> */}
              <h1 className="mb-9 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2 uppercase">
                Register to Dropout Analysis Portal
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      autoComplete="username"
                      name="username"
                      type="text"
                      placeholder="Enter your email"
                      className="w-full rounded-lg py-3 pl-6 pr-10 border border-black"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      autoComplete="username"
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                      className="w-full rounded-lg py-3 pl-6 pr-10 border border-black"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      autoComplete="username"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg py-3 pl-6 pr-10 border border-black"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Role
                  </label>
                  <div className="relative">
                    <select
                      name="role"
                      className="w-full rounded-lg py-3 pl-6 pr-10 border border-black"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    State
                  </label>
                  <div className="relative">
                    <select
                      name="role"
                      className="w-full rounded-lg py-3 pl-6 pr-10 border border-black"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="Gujarat">Gujarat</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    District
                  </label>
                  <div className="relative">
                    <select
                      name="role"
                      className="w-full rounded-lg py-3 pl-6 pr-10 border border-black"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="Anand">Anand</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Stripe ID
                  </label>
                  <div className="relative">
                    <input
                      name="stripe_id"
                      type="text"
                      placeholder="Enter your Stripe ID"
                      className="w-full rounded-lg py-3 pl-6 pr-10 border border-black"
                      value={values.stripe_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Contact
                  </label>
                  <div className="relative">
                    <input
                      name="contact"
                      type="text"
                      placeholder="Enter your contact number"
                      className="w-full rounded-lg py-3 pl-6 pr-10 border border-black"
                      value={values.contact}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="mb-5 ">
                  {/* <NavLink to={"/admin/dashboard"}> */}
                  <button
                    className="w-full tracking-widest py-3 pl-6 pr-10 text-xl text-white bg-black font-bold rounded-lg hover:opacity-80"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
                Already have an Account?
                <Link to={"/"} className="hover:text-red-600 ms-2">
                  Login
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
