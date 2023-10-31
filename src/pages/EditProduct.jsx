import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [editProduct, setEditProduct] = useState({
    name: "",
    category: "",
    recommendation: "",
    image: "",
    description: "",
    price: "",
  });

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpdateProduct();
  };

  const handleProductImageChange = async (e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "The selected file is not an image.",
      });
    } else {
      
      const options = {
        maxSizeMB: 0.05,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditProduct({ ...editProduct, image: reader.result });
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(`https://65369af9bb226bb85dd2676e.mockapi.io/products/${id}`, editProduct);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Product updated successfully!",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/productListing");
          }
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error updating product. Please try again. ${error.message || error}`,
      });
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`https://65369af9bb226bb85dd2676e.mockapi.io/products/${id}`);
        const productData = response.data;
        setEditProduct(productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
        Edit Product
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 w-[800px]">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Input product name"
            required
            value={editProduct.name}
            onChange={handleProductChange}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="recommendation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Recommendation
          </label>
          <select
            id="recommendation"
            name="recommendation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={editProduct.recommendation}
            onChange={handleProductChange}
          >
            <option value="">Select Recommendation</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Category
          </label>
          <select
            id="category"
            name="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={editProduct.category}
            onChange={handleProductChange}
          >
            <option value="">Select Category</option>
            <option>Tas</option>
            <option>Sepatu</option>
            <option>Topi</option>
            <option>Pakaian</option>
            <option>Jam Tangan</option>
          </select>
        </div>

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">
          Upload file
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="image"
          name="image"
          type="file"
          onChange={handleProductImageChange}
        />

        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Description"
          value={editProduct.description}
          onChange={handleProductChange}
        ></textarea>

        <div className="mb-6">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Input Price"
            required
            value={editProduct.price}
            onChange={handleProductChange}
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
            type="button"
            onClick={() => navigate("/productListing")}
            className="text-blue-700 bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 hover:bg-blue-700 hover:text-white dark:focus:ring-blue-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
