import React from "react";
import iconLogout from "../assets/iconLogout.svg"
import {Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Sidebar(){
  const navigate = useNavigate()

  const handleLogout = () => {
    Swal.fire({
      text: "Are you sure you want to log out?",
      title: "Logout",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((response) => {
      if (response.isConfirmed) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        navigate("/");
      }
    });
  };
    return(
        <>
        
<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
</button>

<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center pl-2.5 mb-5">
         {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-7" alt="Flowbite Logo" /> */}
         <p className="self-center text-2xl text-purple-600 font-semibold whitespace-nowrap">Modish</p><span className="text-blue-500 self-center text-2xl  font-semibold whitespace-nowrap">Grace</span>
      </div>
      <ul className="space-y-2 font-medium">
      <li>
  <Link to="/dashboardAdmin" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group hover:from-purple-600 hover:to-blue-500 hover:bg-gradient-to-r">
    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
    </svg>
    <span className="ml-3">Dashboard</span>
  </Link>
</li>

<li>
  <Link to="/productListing" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group hover:from-purple-600 hover:to-blue-500 hover:bg-gradient-to-r">
    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
      <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
    </svg>
    <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
  </Link>
</li>

<li>
  <Link to="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group hover:from-purple-600 hover:to-blue-500 hover:bg-gradient-to-r" onClick={handleLogout}>
    <img src={iconLogout} className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>

    <span className="flex-1 ml-3 whitespace-nowrap">Log Out</span>
  </Link>
</li>
      </ul>
   </div>
</aside>


        </>
    )
}
export default Sidebar;