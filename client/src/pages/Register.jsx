import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import statesData from "../utils/states-and-districts.json"; // Adjust the import path
import { fetchPost } from "../apis/fetch";
import logo from "../assets/logo.jpg";

const Register = () => {
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      state: "",
      district: "",
      stripe_id: "",
      contact: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      district: Yup.string().required("Required"),
      stripe_id: Yup.string().required("Required"),
      contact: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const data = {
        username: values.username,
        email: values.email,
        password: values.password,
        state: values.state,
        district: values.district,
        stripeId: values.stripe_id,
        contact: values.contact,
      };
      const res = await fetchPost("auth/signup", null, JSON.stringify(data));
      if (res.status == "success") {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.user.role);
      }
      navigate("/");
      resetForm();
    },
  });

  useEffect(() => {
    const selectedState = statesData.states.find(
      (state) => state.state === formik.values.state
    );
    setDistricts(selectedState ? selectedState.districts : []);
  }, [formik.values.state]);

  return (
    <div className="min-h-screen rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center m-4">
        <div className="hidden w-full xl:block xl:w-1/2 min-h-screen m-auto justify-center items-center">
          <div className="py-[10.375rem] px-[6.5rem] text-center">
            <span className="inline-block mx-auto">
              {<img src={logo} alt="symbol" />}
            </span>
          </div>
        </div>

        <div className="w-full border-stroke rounded-2xl bg-blue-500 dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-[3.125rem] xl:p-[4.375rem]">
            <h1 className="mb-9 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2 uppercase">
              Register to Portal
            </h1>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Username
                </label>
                <div className="relative">
                  <InputText
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    className={`w-full rounded-lg py-3 pl-6 pr-10 border ${
                      formik.touched.username && formik.errors.username
                        ? "p-invalid"
                        : ""
                    }`}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-600">{formik.errors.username}</div>
                  ) : null}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <InputText
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                    className={`w-full rounded-lg py-3 pl-6 pr-10 border ${
                      formik.touched.email && formik.errors.email
                        ? "p-invalid"
                        : ""
                    }`}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600">{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <InputText
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className={`w-full rounded-lg py-3 pl-6 pr-10 border ${
                      formik.touched.password && formik.errors.password
                        ? "p-invalid"
                        : ""
                    }`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-600">{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  State
                </label>
                <div className="relative">
                  <Dropdown
                    id="state"
                    name="state"
                    options={statesData.states.map((state) => ({
                      label: state.state,
                      value: state.state,
                    }))}
                    placeholder="Select a state"
                    className={`w-full rounded-lg py-3 pl-6 pr-10 border ${
                      formik.touched.state && formik.errors.state
                        ? "p-invalid"
                        : ""
                    }`}
                    value={formik.values.state}
                    onChange={(e) => formik.setFieldValue("state", e.value)}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.state && formik.errors.state ? (
                    <div className="text-red-600">{formik.errors.state}</div>
                  ) : null}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  District
                </label>
                <div className="relative">
                  <Dropdown
                    id="district"
                    name="district"
                    options={districts.map((district) => ({
                      label: district,
                      value: district,
                    }))}
                    placeholder="Select a district"
                    className={`w-full rounded-lg py-3 pl-6 pr-10 border ${
                      formik.touched.district && formik.errors.district
                        ? "p-invalid"
                        : ""
                    }`}
                    value={formik.values.district}
                    onChange={(e) => formik.setFieldValue("district", e.value)}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.district && formik.errors.district ? (
                    <div className="text-red-600">{formik.errors.district}</div>
                  ) : null}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Stripe ID
                </label>
                <div className="relative">
                  <InputText
                    id="stripe_id"
                    name="stripe_id"
                    type="text"
                    placeholder="Enter your Stripe ID"
                    className={`w-full rounded-lg py-3 pl-6 pr-10 border ${
                      formik.touched.stripe_id && formik.errors.stripe_id
                        ? "p-invalid"
                        : ""
                    }`}
                    value={formik.values.stripe_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.stripe_id && formik.errors.stripe_id ? (
                    <div className="text-red-600">
                      {formik.errors.stripe_id}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Contact
                </label>
                <div className="relative">
                  <InputText
                    id="contact"
                    name="contact"
                    type="text"
                    placeholder="Enter your contact number"
                    className={`w-full rounded-lg py-3 pl-6 pr-10 border ${
                      formik.touched.contact && formik.errors.contact
                        ? "p-invalid"
                        : ""
                    }`}
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.contact && formik.errors.contact ? (
                    <div className="text-red-600">{formik.errors.contact}</div>
                  ) : null}
                </div>
              </div>

              <div className="mb-5">
                <button
                  className="w-full tracking-widest py-3 pl-6 pr-10 text-xl text-white bg-black font-bold rounded-lg hover:opacity-80"
                  type="submit"
                >
                  Submit
                </button>
              </div>

              <div>
                Already have an Account?
                <Link to={"/"} className="hover:text-red-600 ms-2">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
