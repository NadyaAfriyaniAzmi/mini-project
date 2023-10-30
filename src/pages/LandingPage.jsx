import React, { useEffect, useState } from "react";
import axios from "axios";
// import Chat from "../components/Chat"
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Category from "../components/Category";
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
            <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                {/* icon facebook */}
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                {/* icon Discord */}
                {/* <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg> */}
                <span className="sr-only">Discord community</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                {/* icon github */}
                {/* <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clipRule="evenodd"
                  />
                </svg> */}
                <span className="sr-only">GitHub account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default LandingPage;
