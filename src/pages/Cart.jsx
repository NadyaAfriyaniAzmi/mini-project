import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, removeSelectedItems } from "../components/cartSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleIncrement = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 1) + 1,
    }));
  };
  function formatRupiah(price) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  const handleDecrement = (index) => {
    if (quantities[index] && quantities[index] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [index]: prevQuantities[index] - 1,
      }));
    }
  };
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No items selected",
        text: "Please select items to checkout.",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Checkout successfully",
        showConfirmButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          dispatch(removeSelectedItems(selectedItems));
          setSelectedItems([]);
        }
      });
    }
  };
  
  
  

  const handleCheckboxChange = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== index)
      );
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, index]);
    }
  };
  

  useEffect(() => {
    let totalPrice = 0;
    selectedItems.forEach((index) => {
      const quantity = quantities[index] || 1;
      totalPrice += items[index].price * quantity;
    });
    setTotalPrice(totalPrice);
  }, [selectedItems, quantities, items]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div className="h-screen p-4 sm:ml-90">
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white py-10">
          Cart
        </h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={index}
                >
                  <td className="w-48 p-4">
                    <img src={item?.image} alt={item.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item?.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button
                        className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                        onClick={() => handleDecrement(index)}
                      >
                        {" "}
                        -
                      </button>
                      <div>
                        <input
                          type="text"
                          min="1"
                          value={quantities[index] || 1}
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                          id="first_product"
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="1"
                          required
                        />
                      </div>
                      <button
                        className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                        onClick={() => handleIncrement(index)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item?.price}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="/cart"
                      className="font-medium text-red-600 hover:underline"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between bottom-0 gap-6 left-0 w-full h-16  border-t border-gray-200 bg-gray-50">
      <div className="flex">
          <button
            onClick={() => {
              navigate("/productPage");
            }}
            className="bg-purple-200 hover:bg-purple-300 items-center px-8"
          >
            Back
          </button>
        </div>
        <div className="flex gap-5">
        <p className="flex items-center">Total Harga: {formatRupiah(totalPrice)}</p>
        <button onClick={handleCheckout} className="bg-blue-300 hover:bg-blue-400 items-center px-5">
          Checkout
        </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
