import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";

function CreateProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleProductNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleProductCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
  };
  const handleProductRecommendationChange = (e) => {
    const value = e.target.value;
    setRecommendation(value);
  };

  const handleProductImageChange = async (e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      setImageError("The selected file is not an image.");
    } else {
      setImageError("");

      const options = {
        maxSizeMB: 0.05,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleProductDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  };
  const handleProductPriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
  };

  const handleAddProduct = async (productData) => {
    try {
      const response = await axios.post("https://65369af9bb226bb85dd2676e.mockapi.io/products", productData);

      if (response.status === 201) {
        const newProduct = response.data;
        setProducts([...products, newProduct]);
        clearFormFields();

        await Swal.fire({
          icon: "success",
          title: "product added succesfully",
          showConfirmButton: "ok",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/productListing");
          }
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const clearFormFields = () => {
    setName("");
    setCategory("");
    setRecommendation("");
    setImage(null);
    setDescription("");
    setPrice("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      category,
      recommendation,
      image,
      description,
      price,
    };

    handleAddProduct(productData);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
          Create Product
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 w-[800px]">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Product Name
            </label>
            <input
              type="text"
              id="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Input product name"
              required
              value={name}
              onChange={handleProductNameChange}
            />
          </div>
          <div>
            <label htmlFor="recommendation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select recommendation
            </label>
            <select
              id="recommendation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={recommendation}
              onChange={handleProductRecommendationChange}
            >
              <option value="" disabled>
                Select Recommendation
              </option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select category
            </label>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={category}
              onChange={handleProductCategoryChange}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option>Tas</option>
              <option>Sepatu</option>
              <option>Topi</option>
              <option>Pakaian</option>
              <option>jam Tangan</option>
            </select>
          </div>

          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">
            Upload file
          </label>
          <input
            className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400${
              errors.image ? "border-red-500" : ""
            }`}
            aria-describedby="user_avatar_help"
            id="image"
            name="image"
            type="file"
            onChange={handleProductImageChange}
          />

          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
            value={description}
            onChange={handleProductDescriptionChange}
          ></textarea>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Price
            </label>
            <input
              type="text"
              id="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Input Price"
              required
              value={price}
              onChange={handleProductPriceChange}
            />
          </div>
          <div className="flex gap-x-8">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 hover:bg-white hover:text-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <button
              type="submit"
              className="text-blue-700 bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 hover:bg-blue-700 hover:text-white dark:focus:ring-blue-800"
              onClick={() => navigate("/productListing")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default CreateProduct;
