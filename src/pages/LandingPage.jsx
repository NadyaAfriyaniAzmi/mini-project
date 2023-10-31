import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import ImgRoller from "../assets/imgroller.png";
import { Link } from "react-router-dom";


function LandingPage() {
  const [product, setProduct] = useState([]);

  const getProduct = (recommendation) => {
    try {
      axios
        .get(
          `https://65369af9bb226bb85dd2676e.mockapi.io/products?recommendation=${recommendation}`
        )
        .then((response) => {
          setProduct(response?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
      getProduct ("yes")
  }, []);
  return (
    <>
      <Navbar showNavbar={true} showLogout={true}/>

      <div className="flex items-center bg-indigo-100 py-20 px-20 gap-8">
        <div className="w-45">
          <h2 className="text-4xl font-extrabold dark:text-white">
            Special product
          </h2>
          <p className="my-4 text-lg text-gray-500">
          Selamat datang di Modish Grace, tempatnya keanggunan dan gaya berkumpul. Kami  menawarkan berbagai pilihan pakaian dengan desain yang modern dan gaya yang modis. Mereka menyediakan berbagai jenis pakaian, seperti blus, celana, atasan, rok, dan lainnya. Mereka juga menyediakan aksesori seperti ikat pinggang, kalung, dan jam tangan. Temukan gaya Anda di Modish Grace
          </p>
          
        </div>
        <div>
          <img src={ImgRoller} alt="" className="w-[1000px]"/>
        </div>
      </div>
      <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        Rekomendasi
      </h3>
      <div className="grid w-full gap-6 px-10 md:grid-cols-5">
        {product &&
          product?.map((item, index) => {
            return (
              <Card
                key={index}
                id={item?.id}
                name={item?.name}
                description={item?.description}
                price={item?.price}
                image={item?.image}
              />
            );
          })}
      </div>

      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <hr className="my-6 " />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <Link to="https://flowbite.com/" className="hover:underline">
                ModishGrace
              </Link>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
export default LandingPage;
