import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ProductListing() {
  const Navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleDeleteProduct = async (product) => {
    try {
      const result = await Swal.fire({
        title: "Konfirmasi",
        text: "Apakah Anda ingin menghapus produk ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#95BDFF",
        cancelButtonColor: "#E97777",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
      });
  
      if (result.isConfirmed) {
        const response = await axios.delete(
          `https://65369af9bb226bb85dd2676e.mockapi.io/products/${product.id}`
        );
  
        if (response.status === 200) {
          const updatedProducts = products.filter((p) => p.id !== product.id);
          setProducts(updatedProducts);
  
          // Menggunakan SweetAlert untuk memberi tahu bahwa produk berhasil dihapus
          Swal.fire("Berhasil!", "Produk berhasil dihapus.", "success");
        }
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire("Error", "Terjadi kesalahan saat menghapus produk.", "error");
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const filteredProducts = products.filter((product) => {
    const productNameLower = product.name.toLowerCase();
    const searchKeywordLower = searchKeyword.toLowerCase();

    return productNameLower.includes(searchKeywordLower);
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          "https://65369af9bb226bb85dd2676e.mockapi.io/products"
        );
        const apiData = response.data.slice(0, 10);

        setProducts(apiData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white py-10">
          Product List
        </h2>
        <div className="flex justify-end">
          <button
            type="button"
            
            onClick={() => {
              Navigate(`/createProduct`);
            }}className="relative inline-flex items-center h-10  border border-blue-500 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 ">
            <span className=" px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
               New
            </span>
          </button>
        
            <Search
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            />
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Recommendation
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={index}
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4">{product.recommendation}</td>
                    <td className="px-6 py-4">{product.description}</td>
                    <td className="flex items-center px-6 py-4 space-x-3">
                      <a
                       onClick={() => Navigate(`/editProduct/${product.id}`)}
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>

                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => handleDeleteProduct(product)}
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductListing;
