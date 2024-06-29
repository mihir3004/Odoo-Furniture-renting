import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { SellItemValidation } from "../../Schemas/SellItemValidation";

const rentalPeriodOptions = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

const categories = [
  { label: "Living Room", value: "living_room" },
  { label: "Bedroom", value: "bedroom" },
  { label: "Kitchen", value: "kitchen" },
  { label: "Office", value: "office" },
];

const SellItem = () => {
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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const onImageUpload = (event) => {
    const imagesArray = Array.from(event.files);
    formik.setFieldValue("images", imagesArray);
  };

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
