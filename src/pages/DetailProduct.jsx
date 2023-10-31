import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`https://65369af9bb226bb85dd2676e.mockapi.io/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]);

  return (
    <div className="w-full">
      <Navbar />
      {product.length !== 0 ? (
        <div>
          <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white py-10">
            Product Detail
          </h2>
          <div className="flex">
            <div className="flex justify-center flex-col md:flex-row w-full h-screen ">
              <div className="flex flex-col w-[1500px] h-[500px] bg-white border border-gray-200  rounded-lg shadow">
                <div className="md:flex w-full h-screen gap-10 p-4">
                  <img
                    src={product.image}
                    alt=""
                    className="w-[500px] h-[465px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
                  />
                  <div className="p-5 flex-grow md:flex-col flex-1 mt-2">
                    <h5 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                      {product.name}
                    </h5>
                    <p className="text-lg font-normal text-gray-700 dark:text-gray-400 mb-4">{product.description}</p>
                    <div className="flex justify-between pt-60">
                      <p className="text-xl text-gray-900">Rp. {product.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default DetailProduct;
