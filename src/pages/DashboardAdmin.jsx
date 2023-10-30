import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "../components/Search";
import Card from "../components/Card";
import Category from "../components/Category";
import ImgJam from "../assets/imgJam.png";
import ImgPakaian from "../assets/imgPakaian.png";
import ImgTas from "../assets/imgTas.png";
import ImgTopi from "../assets/imgTopi.png";
import ImgSepatu from "../assets/imgSepatu.png";
import ImgRoller from "../assets/imgroller.png";
import Sidebar from "../components/Sidebar";

function DashboardAdmin() {
  const [product, setProduct] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all product");

  const getProduct = async () => {
    try {
      let apiUrl = "https://65369af9bb226bb85dd2676e.mockapi.io/products";

      if (categoryFilter !== "all product") {
        apiUrl += `?category=${categoryFilter}`;
      }

      const response = await axios.get(apiUrl);

      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredProducts = product.filter((item) => {
    const productNameLower = item.name.toLowerCase();
    const searchKeywordLower = searchKeyword.toLowerCase();
    
    return productNameLower.includes(searchKeywordLower);
  });
  
  useEffect(() => {
    getProduct();
  }, [categoryFilter]);
  
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white py-10">
          Product Detail
        </h2>
        <div className="flex justify-end">
          <Search
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        Kategori
      </h3>
        <div className="grid w-full gap-6 px-10 md:grid-cols-5">
          <Category
            label={"sepatu"}
            image={ImgSepatu}
            onClick={() => {
              setCategoryFilter("sepatu");
            }}
          />
          <Category
            label={"Jam Tangan"}
            image={ImgJam}
            onClick={() => {
              setCategoryFilter("jam tangan");
            }}
          />
          <Category
            label={"Topi"}
            image={ImgTopi}
            onClick={() => {
              setCategoryFilter("topi");
            }}
          />
          <Category
            label={"Tas"}
            image={ImgTas}
            onClick={() => {
              setCategoryFilter("Tas");
            }}
          />
          <Category
            label={"Pakaian"}
            image={ImgPakaian}
            onClick={() => {
              setCategoryFilter("Pakaian");
            }}
          />
          <Category
            label={"All Product"}
            image={ImgRoller}
            onClick={() => {
              setCategoryFilter("all product");
            }}
          />
        </div>

        <div className="grid w-full gap-6 px-10 md:grid-cols-4">
          {filteredProducts.map((item, index) => (
            <Card
              key={index}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
