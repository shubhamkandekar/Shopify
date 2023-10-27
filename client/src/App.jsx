import "./index.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PagenotFound from "./pages/PagenotFound";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/forgotPassword";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import Private from "./components/Routes/private";
import AdminRoute from "./components/Routes/Admin";
import AdminDashboard from "./pages/admin/adminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import User from "./pages/admin/User";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/updateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CartPage from "./pages/cartPage";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
  return <>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/product/:slug" element={<ProductDetails/>}/>
    <Route path="/categories/:slug" element={<Categories/>}/>
    <Route path="/cart" element={<CartPage/>}/>
    <Route path="/Search" element={<Search/>}/>
    <Route path="/dashboard" element={<Private/>}>
       <Route path="user" element={<Dashboard/>}/>
       <Route path="user/orders" element={<Orders/>}/>
       <Route path="user/profile" element={<Profile/>}/>
    </Route>
    <Route path="/dashboard" element={<AdminRoute/>}>
       <Route path="admin" element={<AdminDashboard/>}/>
       <Route path="admin/create-category" element={<CreateCategory/>}/>
       <Route path="admin/create-product" element={<CreateProduct/>}/>
       <Route path="admin/product/:slug" element={<UpdateProduct />}/>
       <Route path="admin/products" element={<Products/>}/>
       <Route path="admin/orders" element={<AdminOrders/>}/>
       <Route path="admin/user" element={<User/>}/>
    </Route>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/forgotpassword" element={<ForgotPassword />}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/policy" element={<Policy/>}/>
    <Route path="/*" element={<PagenotFound/>}/>
  </Routes>
  </>;
}

export default App;
