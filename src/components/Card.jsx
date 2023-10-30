import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ id, name, price, image, handleAddtoCart, showCartButton }) {
  const navigate = useNavigate();

  return (
    <div className="w-70 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center">
          <img
            className="rounded-t-lg w-full h-[300px] object-cover"
            src={image !== null && !image.includes("webp") ? image : "https://placehold.co/600X500"}
            alt={name}
          />
        </div>
        <div className="p-5 flex-grow">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
          <p className="mb-3 font-semibold text-slate-700">Rp. {price}</p>
        </div>
        {showCartButton && (
          <div className="p-5 flex justify-between">
            <button
              onClick={() =>
                navigate(`/detailProduct/${id}`, {
                  state: {
                    name: "Product Name",
                    description: "Product Description",
                    price: 100,
                  },
                })
              }
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
            >
              <span className="relative px-6 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                Read More
              </span>
            </button>
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              id="add-to-cart"
              onClick={handleAddtoCart}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Add to Cart
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
