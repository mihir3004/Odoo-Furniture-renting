import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { SellItemValidation } from "../../Schemas/SellItemValidation";
import { fetchGet } from "../../apis/fetch";

const rentalPeriodOptions = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

const SellItem = () => {
  const [categories, setCategories] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      rentalPrice: "",
      available: false,
      images: [],
      category: "",
      rentalPeriod: "",
    },
    validationSchema: SellItemValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      for (let i = 0; i < values.images.length; i++) {
        formData.append("images", values.images[i]);
      }
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("rentalPeriod", values.rentalPeriod);
      formData.append("rentalPrice", values.rentalPrice);
      formData.append("category", values.category);
      formData.append("available", values.available);
      console.log(values);
      console.log("FormData contents:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const res = await fetch("http://localhost:9999/furniture/add", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        method: "POST",
        body: formData,
      });
      if (res.status == 201) {
        formik.resetForm();
      }
      console.log(res);
    },
  });

  const onImageUpload = (event) => {
    const imagesArray = Array.from(event.files);
    formik.setFieldValue("images", imagesArray);
  };

  const fetchCategory = async () => {
    try {
      const res = await fetchGet(
        "furniture/getCategories",
        localStorage.getItem("token")
      );
      const transformedCategories = res.categories.map((category) => ({
        label: category.name,
        value: category.name.toLowerCase().replace(/\s+/g, "_"),
      }));
      setCategories(transformedCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-serif font-semibold text-blue-800">
        {" "}
        Add Item For Sell
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Furniture Name
          </label>
          <InputText
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 border rounded w-full"
          />
          {formik.touched.name && formik.errors.name && (
            <small className="text-red-500">{formik.errors.name}</small>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <InputTextarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={5}
            className="p-2 border rounded w-full"
          />
          {formik.touched.description && formik.errors.description && (
            <small className="text-red-500">{formik.errors.description}</small>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="rentalPrice"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Rental Price
          </label>
          <InputText
            id="rentalPrice"
            name="rentalPrice"
            value={formik.values.rentalPrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 border rounded w-full"
          />
          {formik.touched.rentalPrice && formik.errors.rentalPrice && (
            <small className="text-red-500">{formik.errors.rentalPrice}</small>
          )}
        </div>

        <div className="mb-4">
          <Checkbox
            inputId="available"
            name="available"
            checked={formik.values.available}
            onChange={formik.handleChange}
            className="p-checkbox-label"
          />
          <label
            htmlFor="available"
            className="ml-2 text-sm font-bold text-gray-700"
          >
            Available
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Images
          </label>
          <FileUpload
            name="images"
            multiple
            accept="image/*"
            onSelect={onImageUpload}
            maxFileSize={1000000} // 1MB
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category
          </label>
          <Dropdown
            id="category"
            name="category"
            options={categories}
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 border rounded w-full"
            placeholder="Select a category"
          />
          {formik.touched.category && formik.errors.category && (
            <small className="text-red-500">{formik.errors.category}</small>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="rentalPeriod"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Rental Period
          </label>
          <Dropdown
            id="rentalPeriod"
            name="rentalPeriod"
            options={rentalPeriodOptions}
            value={formik.values.rentalPeriod}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 border rounded w-full"
            placeholder="Select a rental period"
          />
          {formik.touched.rentalPeriod && formik.errors.rentalPeriod && (
            <small className="text-red-500">{formik.errors.rentalPeriod}</small>
          )}
        </div>

        <div className="flex items-center justify-center mt-6">
          <Button
            type="submit"
            label="Submit"
            className="p-button-rounded p-button-success px-6 py-2"
          />
        </div>
      </form>
    </div>
  );
};

export default SellItem;
