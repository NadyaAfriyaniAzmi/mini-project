import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductListing from "./pages/ProductListing";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct"
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import ChatBox from "./pages/ChatBox";
import DetailProduct from "./pages/DetailProduct";
import DashbordAdmin from "./pages/DashboardAdmin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<ProductListing />} path="/productListing" />
          <Route element={<CreateProduct />} path="/createProduct" />
          <Route element={<EditProduct/>} path="/editProduct/:id" />
          <Route element={<ProductPage />} path="/productPage"/>
          <Route element={<Cart />} path="/cart" />
          <Route element={<ChatBox/>} path="/chatBox" />
          <Route element={<DashbordAdmin/>} path="/dashboardAdmin" />
          <Route element={<DetailProduct/>} path="/detailProduct/:id"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
