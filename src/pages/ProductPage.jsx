import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Category from "../components/Category";
import ImgJam from "../assets/imgJam.png";
import ImgPakaian from "../assets/imgPakaian.png";
import ImgTas from "../assets/imgTas.png";
import ImgTopi from "../assets/imgTopi.png";
import ImgSepatu from "../assets/imgSepatu.png";
import ImgRoller from "../assets/imgroller.png";
import imgBelanja from "../assets/imgBelanja.jpg";
import Swal from "sweetalert2";
import { addItem } from "../components/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import Search from "../components/Search";

function ProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all product");

  const isLoggedIn = localStorage.getItem("isLoggedIn");

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

  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sorry, you need to Sign-in to add items to the cart.",
        showCancelButton: true,
        cancelButtonColor: "#E97777",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#95BDFF",
        confirmButtonText: "Sign In",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    const newItem = {
      id: item?.id,
      title: item?.name,
      image: item?.image,
      category: item?.category,
      description: item?.description,
      price: item?.price,
    };

    dispatch(addItem(newItem));
    navigate("/cart");
  };

  
  const filteredProducts = product.filter((item) => {
    const productNameLower = item.name.toLowerCase();
    const searchKeywordLower = searchKeyword.toLowerCase();
    
    return productNameLower.includes(searchKeywordLower);
  });
  
  useEffect(() => {
    getProduct();
  }, [categoryFilter]);
  
  useEffect(() => {
    if (searchKeyword === "") {
      getProduct();
    }
  }, [searchKeyword]);

  const handleSearch = (searchKeyword) => {
    setSearchKeyword(searchKeyword);
  };
  return (
    <>
      <Navbar
        onSearch={handleSearch}
        showSearch={true}
        showLogout={true}
        showNavbar={true}
      />
      <div className="max-w-7xl m-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white my-5">
          Kategori
        </h3>

        <div className="grid w-full gap-6 px-10 md:grid-cols-6 mb-8">
          <Category
            label={"All Product"}
            image={ImgRoller}
            onClick={() => {
              setCategoryFilter("all product");
            }}
          />
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
        </div>
        <div className="grid w-full gap-6 px-10 md:grid-cols-3">
          {filteredProducts.map((item, index) => (
            <Card
              key={index}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              showCartButton={true}
              handleAddtoCart={() => handleAddToCart(item)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductPage;
