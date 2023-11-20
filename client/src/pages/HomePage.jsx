import React, { Fragment, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import toast, { LoaderIcon } from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import iphone from "../assets/iphone.png";
import { Link } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  //Get ALL Category.
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_URL + "/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went Wrong In getting Category");
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get All products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        import.meta.env.VITE_URL + `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Unable to get All Products");
    }
  };
  //
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_URL + "/api/v1/product/product-pagination"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  // LoadMore
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        import.meta.env.VITE_URL + `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //FILTERING BY CATEGORY
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  //get Filter Products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_URL + "/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Filter Not Added");
    }
  };
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const renderProductCard = () => {
    if (loading) {
      // Skeleton loader
      return (
        <div className="grid  grid-cols-1 mb-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mx-3">
          {[...Array(8)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    // Actual product cards
    return (
      <div className="grid  grid-cols-1 mb-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mx-3">
        {products?.map((p) => (
          <div
            key={p._id}
            className="product-card p-4 h-max bg-gradient-to-r from-slate-100 via-sky-100 to-blue-100  shadow-lg rounded-2xl border-[2px] border-slate-400"
          >
            <div className="relative">
              <img
                src={
                  import.meta.env.VITE_URL +
                  `/api/v1/product/product-photo/${p._id}`
                }
                alt={p.name}
                className="w-full h-[25vw] lg:h-[12vw] object-contain"
              />
              <button
                onClick={() => {
                  setCart([...cart, p]);
                  localStorage.setItem("cart", JSON.stringify([...cart, p]));
                  toast.success("Item Added To Cart");
                }}
                className="absolute top-0 right-0 bg-sky-200 rounded-full p-1 "
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="hover:fill-blue-900 "
                >
                  <path
                    d="M8.15371 12.8177C7.94906 12.89 7.612 12.89 7.40735 12.8177C5.66183 12.2219 1.76149 9.73599 1.76149 5.52266C1.76149 3.66278 3.26023 2.15802 5.10808 2.15802C6.20354 2.15802 7.17261 2.6877 7.78053 3.50629C8.38845 2.6877 9.36354 2.15802 10.453 2.15802C12.3008 2.15802 13.7996 3.66278 13.7996 5.52266C13.7996 9.73599 9.89923 12.2219 8.15371 12.8177Z"
                    stroke="#292D32"
                    strokeWidth="0.902856"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="product-details mx-2">
              <h3 className="text-lg text-left mt-1 font-semibold rounded-lg font-poppins text-blue-900 mx-9 xs:mx-1 sm:mx-2 md:mx-2 ">
                {p.name}
              </h3>
              <h3 className="text-base font-bold rounded-lg mx-9 xs:mx-1 sm:mx-2 md:mx-2">
                ₹ : <span className="text-sm font-semibold">{p.price}</span>
              </h3>

              <div className="flex justify-between mt-2 mx-9 xs:mx-1 sm:mx-2 md:mx-2">
                <button
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item Added To Cart");
                  }}
                  className="p-1.5 flex justify-center items-center   rounded-md shadow-md shadow-gray-300 font-poppins bg-gradient-to-l  from-blue-800 to-blue-900  hover:scale-110 delay-100  text-white"
                >
                  Add to Cart
                  <div className="bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500 rounded-full ml-2">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className=" h-7 w-7 p-1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </div>
                </button>
                <button
                  onClick={() => navigate(`/product/${p.slug}`)}
                  className="rounded-md text-white font-poppins shadow-md shadow-gray-300 p-1 px-1.5 bg-sky-200"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    
                  >
                    <path
                      d="M15.5289 12.1127C15.5289 14.0601 13.9553 15.6338 12.0079 15.6338C10.0605 15.6338 8.48682 14.0601 8.48682 12.1127C8.48682 10.1653 10.0605 8.59167 12.0079 8.59167C13.9553 8.59167 15.5289 10.1653 15.5289 12.1127Z"
                      stroke="#292D32"
                      strokeWidth="1.47531"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.008 20.2465C15.4799 20.2465 18.7157 18.2008 20.968 14.66C21.8532 13.2733 21.8532 10.9423 20.968 9.55549C18.7157 6.01475 15.4799 3.96899 12.008 3.96899C8.53612 3.96899 5.30028 6.01475 3.04798 9.55549C2.1628 10.9423 2.1628 13.2733 3.04798 14.66C5.30028 18.2008 8.53612 20.2465 12.008 20.2465Z"
                      stroke="#292D32"
                      strokeWidth="1.47531"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex gap-x-1 mt-2 ml-1 xs:ml-3 xxs:ml-9">
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                
                  
                >
                  <path
                    d="M8.71397 1.65469L10.0122 4.25123C10.1893 4.6053 10.6614 4.95938 11.0548 5.01839L13.4054 5.41181C14.9103 5.66753 15.2643 6.74942 14.1824 7.83131L12.3531 9.67052C12.0482 9.97542 11.8711 10.5754 11.9695 11.0081L12.4908 13.2801C12.9038 15.0701 11.9498 15.7685 10.3663 14.8341L8.16319 13.526C7.75994 13.2899 7.11081 13.2899 6.70756 13.526L4.4946 14.8243C2.9111 15.7586 1.95707 15.0603 2.37016 13.2703L2.89143 10.9983C2.98979 10.5754 2.81275 9.97542 2.50785 9.66069L0.688308 7.84114C-0.393583 6.75925 -0.0395099 5.66752 1.4653 5.42164L3.81596 5.02823C4.20937 4.95938 4.68147 4.61514 4.85851 4.26107L6.15678 1.66453C6.85509 0.248233 8.01566 0.248233 8.71397 1.65469Z"
                    fill="#ACACAC"
                  />
                </svg>
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.71397 1.65469L10.0122 4.25123C10.1893 4.6053 10.6614 4.95938 11.0548 5.01839L13.4054 5.41181C14.9103 5.66753 15.2643 6.74942 14.1824 7.83131L12.3531 9.67052C12.0482 9.97542 11.8711 10.5754 11.9695 11.0081L12.4908 13.2801C12.9038 15.0701 11.9498 15.7685 10.3663 14.8341L8.16319 13.526C7.75994 13.2899 7.11081 13.2899 6.70756 13.526L4.4946 14.8243C2.9111 15.7586 1.95707 15.0603 2.37016 13.2703L2.89143 10.9983C2.98979 10.5754 2.81275 9.97542 2.50785 9.66069L0.688308 7.84114C-0.393583 6.75925 -0.0395099 5.66752 1.4653 5.42164L3.81596 5.02823C4.20937 4.95938 4.68147 4.61514 4.85851 4.26107L6.15678 1.66453C6.85509 0.248233 8.01566 0.248233 8.71397 1.65469Z"
                    fill="#ACACAC"
                  />
                </svg>
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.71397 1.65469L10.0122 4.25123C10.1893 4.6053 10.6614 4.95938 11.0548 5.01839L13.4054 5.41181C14.9103 5.66753 15.2643 6.74942 14.1824 7.83131L12.3531 9.67052C12.0482 9.97542 11.8711 10.5754 11.9695 11.0081L12.4908 13.2801C12.9038 15.0701 11.9498 15.7685 10.3663 14.8341L8.16319 13.526C7.75994 13.2899 7.11081 13.2899 6.70756 13.526L4.4946 14.8243C2.9111 15.7586 1.95707 15.0603 2.37016 13.2703L2.89143 10.9983C2.98979 10.5754 2.81275 9.97542 2.50785 9.66069L0.688308 7.84114C-0.393583 6.75925 -0.0395099 5.66752 1.4653 5.42164L3.81596 5.02823C4.20937 4.95938 4.68147 4.61514 4.85851 4.26107L6.15678 1.66453C6.85509 0.248233 8.01566 0.248233 8.71397 1.65469Z"
                    fill="#ACACAC"
                  />
                </svg>
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.71397 1.65469L10.0122 4.25123C10.1893 4.6053 10.6614 4.95938 11.0548 5.01839L13.4054 5.41181C14.9103 5.66753 15.2643 6.74942 14.1824 7.83131L12.3531 9.67052C12.0482 9.97542 11.8711 10.5754 11.9695 11.0081L12.4908 13.2801C12.9038 15.0701 11.9498 15.7685 10.3663 14.8341L8.16319 13.526C7.75994 13.2899 7.11081 13.2899 6.70756 13.526L4.4946 14.8243C2.9111 15.7586 1.95707 15.0603 2.37016 13.2703L2.89143 10.9983C2.98979 10.5754 2.81275 9.97542 2.50785 9.66069L0.688308 7.84114C-0.393583 6.75925 -0.0395099 5.66752 1.4653 5.42164L3.81596 5.02823C4.20937 4.95938 4.68147 4.61514 4.85851 4.26107L6.15678 1.66453C6.85509 0.248233 8.01566 0.248233 8.71397 1.65469Z"
                    fill="#ACACAC"
                  />
                </svg>
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.71397 1.65469L10.0122 4.25123C10.1893 4.6053 10.6614 4.95938 11.0548 5.01839L13.4054 5.41181C14.9103 5.66753 15.2643 6.74942 14.1824 7.83131L12.3531 9.67052C12.0482 9.97542 11.8711 10.5754 11.9695 11.0081L12.4908 13.2801C12.9038 15.0701 11.9498 15.7685 10.3663 14.8341L8.16319 13.526C7.75994 13.2899 7.11081 13.2899 6.70756 13.526L4.4946 14.8243C2.9111 15.7586 1.95707 15.0603 2.37016 13.2703L2.89143 10.9983C2.98979 10.5754 2.81275 9.97542 2.50785 9.66069L0.688308 7.84114C-0.393583 6.75925 -0.0395099 5.66752 1.4653 5.42164L3.81596 5.02823C4.20937 4.95938 4.68147 4.61514 4.85851 4.26107L6.15678 1.66453C6.85509 0.248233 8.01566 0.248233 8.71397 1.65469Z"
                    fill="#ACACAC"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout title={"All Products -shopify app"}>
      <div className="flex bg-gradient-to-l  from-gray-200 to-blue-100">
        {/* -----------------SideBar--------------------- */}
        <>
          {!sidebarVisible && (
            <button
              type="button"
              className="flex mt-2 p-0.5 mx-0.5 h-7  text-sm text-gray-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 hover:scale-125 "
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
              </svg>
            </button>
          )}
          {sidebarVisible && (
            <aside
              className={`w-1/4 lg:w-[15%] transition-transform bg-gradient-to-br  from-gray-200 to-blue-100 ${
                sidebarVisible ? "open" : ""
              }`}
              aria-label="Sidebar"
            >
              <div className="flex justify-between items-center   border-b-2  bg-gradient-to-l  from-blue-900 to-blue-950  ">
                <h1 className="text-lg mt-1 font-poppins text-white ml-2 ">
                  Filters
                </h1>
                <button
                  className="  text-gray-100 hover:text-dimWhite focus:outline-none hover:scale-125 mr-1"
                  onClick={toggleSidebar}
                >
                  <svg
                    className="w-6 h-6 justify-end"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.293 4.293A1 1 0 114.707 2.88L9 7.17l4.293-4.293a1 1 0 111.414 1.414L10.414 8l4.293 4.293a1 1 0 01-1.414 1.414L9 9.83l-4.293 4.293a1 1 0 01-1.414-1.414L7.586 8 3.293 3.707a1 1 0 01-.88-1.414z"
                    />
                  </svg>
                </button>
              </div>
              <h4 className="text-center mx-1 mt-3 bg-gradient-to-l  from-blue-900 to-blue-950 text-white shadow-white shadow-sm p-1 rounded-md font-poppins">
                Category
              </h4>
              <div className="flex flex-col gap-y-2 mx-2">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    className="border-gray-400 border-b-2 rounded-sm pb-0.5"
                  >
                    <span className="text-gray-600 hover:text-gray-900 text-xs lg:text-lg  font-semibold">
                      {c.name}
                    </span>
                  </Checkbox>
                ))}
              </div>
              {/* Price Filter  */}
              <h4 className=" mt-10 text-center mx-1  bg-gradient-to-l  from-blue-900 to-blue-950 text-white shadow-white shadow-sm p-1 rounded-md font-poppins">
                Price
              </h4>
              <div className="flex flex-col gap-y-2 mx-2 ">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div
                      className=" mt-2 mb-1 lg:mb-2.5 border-gray-400 border-b-2 rounded-sm pb-0.5"
                      key={p._id}
                    >
                      <Radio value={p.array}>
                        <span className="text-gray-600 hover:text-gray-900 font-semibold text-xs lg:text-lg">
                          {p.name}
                        </span>
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="flex justify-center mt-5 ">
                <button
                  className="bg-rose-500 hover:bg-rose-600 text-white rounded-lg shodow-primary shadow-md p-2 font-poppins"
                  onClick={() => window.location.reload()}
                >
                  Reset Filters
                </button>
              </div>
            </aside>
          )}
        </>
        <div className="w-full bg-gradient-to-l  from-gray-200 to-blue-100 mr-6">
          {/*--------------------------------Main Page Contain------------------------------------------------  */}
          {/* -----------Hero Section ------------------- */}
          <div className="Hero-section lg:h-[40vw] h-max  bg-gradient-to-l from-gray-700 via-gray-900 to-black rounded-lg mt-4 mx-1 shadow-lg flex flex-col md:flex-row">
            <div className="left p-5 w-full md:w-1/2 rounded-md flex justify-center items-center flex-col">
              <span className="text-white font-poppins text-5xl lg:text-9xl font-extrabold text-center">
                New Arrivals
              </span>
              <p className="text-orange-500 text-center mt-5 lg:mt-10 font-poppins font-bold text-2xl lg:text-5xl">
                Sale Upto 10% Off
              </p>
              <p className="text-center text-white font-semibold text-xl lg:text-3xl">
                Iphone 15 Series
              </p>
              <div className="h-10 w-1/2 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500 rounded-md text-center font-poppins flex justify-center items-center hover:scale-125 delay-100">
                <span className="lg:text-lg lg:font-semibold text-primary">
                  Mobile Phones
                </span>
              </div>
            </div>
            <div className="right p-10 w-full md:w-1/2 rounded-md flex justify-center">
              <img
                className="object-contain shadow-white drop-shadow-md hover:scale-105 delay-100"
                src={iphone}
                alt="product img"
              />
            </div>
          </div>
          {/* categories filter */}
          <div className=" min-h-max p-2 flex flex-col items-center rounded-md mt-3 ">
            <div className="w-full max-w-screen-lg flex flex-wrap justify-center">
              {categories?.map((c) => (
                <div key={c._id} className="w-full min-h-max md:w-1/3 p-2">
                  <div className="p-2 text-center border-gray-400 border-4 rounded-xl ">
                    <Link to={`/categories/${c.slug}`}>
                      <div className="flex justify-evenly items-center">
                        <div>
                          <svg
                            width="50px"
                            height="50px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                opacity="0.34"
                                d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z"
                                stroke="#2b77d4"
                                strokeWidth="1.5"
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />{" "}
                              <path
                                d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
                                stroke="#2b77d4"
                                strokeWidth="1.5"
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />{" "}
                              <path
                                opacity="0.34"
                                d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z"
                                stroke="#2b77d4"
                                strokeWidth="1.5"
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />{" "}
                              <path
                                d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
                                stroke="#2b77d4"
                                strokeWidth="1.5"
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />{" "}
                            </g>
                          </svg>
                        </div>
                        <div className="text-3xl font-bold font-poppins text-blue-950 ">
                          {c.name}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --------------------Products------------------ */}
          <h1 className="text-center lg:text-lg mx-1 mt-3 bg-gradient-to-l  from-blue-900 to-blue-950 text-white  shadow-sm p-2 rounded-md font-poppins">
            Listed Products
          </h1>
          {renderProductCard()}

          {/* -----Features section ----------- */}
          <div className="bg-gradient-to-l from-blue-900 to-blue-950 min-h-max p-2 flex flex-col items-center mx-3 rounded-md">
            <div className="w-full max-w-screen-lg flex flex-wrap justify-center">
              <div className="w-full min-h-max md:w-1/3 p-1">
                <div className=" p-4  rounded-lg shadow-md flex justify-around ">
                  <svg
                    width="67"
                    height="67"
                    viewBox="0 0 67 67"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M49.1333 14.8237L33.3604 6.33699C31.6854 5.44366 29.7033 5.44366 28.0283 6.33699L12.2833 14.8237C11.1387 15.4657 10.4129 16.6941 10.4129 18.0341C10.4129 19.402 11.1108 20.6303 12.2833 21.2445L28.0562 29.7312C28.8937 30.1778 29.815 30.4012 30.7083 30.4012C31.6017 30.4012 32.5508 30.1778 33.3604 29.7312L49.1333 21.2445C50.2779 20.6303 51.0037 19.402 51.0037 18.0341C51.0037 16.6941 50.2779 15.4657 49.1333 14.8237Z"
                      fill="#EDA415"
                    />
                    <path
                      d="M25.46 32.6902L10.8037 25.3761C9.65915 24.7898 8.37498 24.8736 7.28623 25.5157C6.2254 26.1857 5.58331 27.3302 5.58331 28.5865V42.4332C5.58331 44.834 6.92331 46.9836 9.0729 48.0723L23.7291 55.3865C24.2316 55.6377 24.79 55.7773 25.3483 55.7773C25.9904 55.7773 26.6604 55.5819 27.2466 55.2469C28.3075 54.5769 28.9496 53.4323 28.9496 52.1761V38.3294C28.9216 35.9286 27.5816 33.779 25.46 32.6902Z"
                      fill="#EDA415"
                    />
                    <path
                      d="M55.8333 28.5865V35.454C54.4933 35.0632 53.0696 34.8957 51.6458 34.8957C47.8492 34.8957 44.1362 36.2077 41.205 38.5527C37.185 41.7073 34.8958 46.4811 34.8958 51.6457C34.8958 53.0136 35.0633 54.3815 35.4262 55.6936C35.0075 55.6377 34.5887 55.4702 34.1979 55.219C33.1371 54.5769 32.495 53.4323 32.495 52.1761V38.3294C32.495 35.9286 33.835 33.779 35.9567 32.6902L50.6129 25.3761C51.7575 24.7898 53.0417 24.8736 54.1304 25.5157C55.1912 26.1857 55.8333 27.3302 55.8333 28.5865Z"
                      fill="#EDA415"
                    />
                    <path
                      d="M61.3608 43.7454C59.0716 40.9258 55.5821 39.1392 51.6458 39.1392C48.6866 39.1392 45.9508 40.1721 43.8012 41.9029C40.8979 44.1921 39.0833 47.7375 39.0833 51.7017C39.0833 54.0467 39.7533 56.28 40.8979 58.1783C41.6516 59.4346 42.6008 60.5233 43.7175 61.4167H43.7454C45.895 63.2033 48.6587 64.2642 51.6458 64.2642C54.8283 64.2642 57.7037 63.0917 59.9091 61.1375C60.8862 60.3 61.7237 59.295 62.3937 58.1783C63.5383 56.28 64.2083 54.0467 64.2083 51.7017C64.2083 48.6867 63.1475 45.895 61.3608 43.7454ZM57.955 50.1383L51.255 56.3358C50.8641 56.6987 50.3337 56.8942 49.8312 56.8942C49.3008 56.8942 48.7704 56.6987 48.3516 56.28L45.2529 53.1812C44.4433 52.3717 44.4433 51.0317 45.2529 50.2221C46.0625 49.4125 47.4025 49.4125 48.2121 50.2221L49.8871 51.8971L55.1075 47.0675C55.945 46.2858 57.285 46.3417 58.0666 47.1792C58.8762 48.0446 58.8204 49.3567 57.955 50.1383Z"
                      fill="#EDA415"
                    />
                  </svg>
                  <div className="flex flex-col">
                    <h1 className="text-lg font-poppins text-white font-bold">
                      Free delivery
                    </h1>
                    <h3 className="text-sm font-poppins text-white">
                      On Order Above ₹5000
                    </h3>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-1 ">
                <div className=" p-4  rounded-lg shadow-md flex justify-around">
                  <svg
                    width="67"
                    height="67"
                    viewBox="0 0 67 67"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M47.4584 61.4167H19.5417C18.3971 61.4167 17.4479 60.4676 17.4479 59.323C17.4479 58.1784 18.3971 57.2292 19.5417 57.2292H47.4584C48.6029 57.2292 49.5521 58.1784 49.5521 59.323C49.5521 60.4676 48.6029 61.4167 47.4584 61.4167Z"
                      fill="#EDA415"
                    />
                    <path
                      d="M56.8104 15.4101L45.6438 23.3942C44.1642 24.4551 42.0425 23.813 41.4004 22.1101L36.1242 8.04007C35.2308 5.61132 31.7971 5.61132 30.9038 8.04007L25.5996 22.0822C24.9575 23.813 22.8638 24.4551 21.3842 23.3663L10.2175 15.3822C7.98417 13.8188 5.025 16.0242 5.94625 18.6205L17.5596 51.1434C17.9504 52.2601 19.0113 52.9859 20.1838 52.9859H46.7883C47.9608 52.9859 49.0217 52.2321 49.4125 51.1434L61.0258 18.6205C61.975 16.0242 59.0158 13.8188 56.8104 15.4101ZM40.4792 41.1772H26.5208C25.3763 41.1772 24.4271 40.228 24.4271 39.0834C24.4271 37.9388 25.3763 36.9897 26.5208 36.9897H40.4792C41.6238 36.9897 42.5729 37.9388 42.5729 39.0834C42.5729 40.228 41.6238 41.1772 40.4792 41.1772Z"
                      fill="#EDA415"
                    />
                  </svg>
                  <div className="flex flex-col">
                    <h1 className="text-lg font-poppins text-white font-bold">
                      Best Quality
                    </h1>
                    <h3 className="text-sm font-poppins text-white">
                      Best quality in low Price
                    </h3>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-1 ">
                <div className=" p-4  rounded-lg shadow-md flex justify-around">
                  <svg
                    width="67"
                    height="67"
                    viewBox="0 0 67 67"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M51.7575 11.6412L36.4033 5.89037C34.8121 5.30412 32.2158 5.30412 30.6246 5.89037L15.2704 11.6412C12.3112 12.7579 9.91042 16.2195 9.91042 19.3741V41.9866C9.91042 44.2479 11.39 47.235 13.2046 48.575L28.5587 60.0487C31.2667 62.0866 35.7054 62.0866 38.4133 60.0487L53.7675 48.575C55.5821 47.207 57.0617 44.2479 57.0617 41.9866V19.3741C57.0896 16.2195 54.6888 12.7579 51.7575 11.6412ZM35.5938 35.9287V43.2708C35.5938 44.4154 34.6446 45.3645 33.5 45.3645C32.3554 45.3645 31.4062 44.4154 31.4062 43.2708V35.9287C28.5867 35.0354 26.5208 32.4112 26.5208 29.3125C26.5208 25.46 29.6475 22.3333 33.5 22.3333C37.3525 22.3333 40.4792 25.46 40.4792 29.3125C40.4792 32.4391 38.4133 35.0354 35.5938 35.9287Z"
                      fill="#EDA415"
                    />
                  </svg>
                  <div className="flex flex-col">
                    <h1 className="text-lg font-poppins text-white font-bold">
                      1 Year Warranty
                    </h1>
                    <h3 className="text-sm font-poppins text-white">
                      Warranty for Electronic Products
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* load More Button */}
          <div className=" p-3 w-full flex justify-center items-center bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 mt-5 rounded-lg ">
            {products && products.length < total && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                className=" text-primary font-semibold  font-poppins flex gap-x-2 "
              >
                {loading ? (
                  <>
                    {" "}
                    Loading <LoaderIcon />
                  </>
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
          {/* Below Hero Section */}
          <div className="Hero-section lg:h-[20vw] h-max  bg-gradient-to-l from-gray-700 via-gray-900 to-black rounded-lg mt-4 mx-1 shadow-lg flex flex-col md:flex-row mb-5">
            <div className="right p-5 w-full md:w-1/2 md:h-[20vw] rounded-md flex justify-center">
              <img
                src="https://dlcdnwebimgs.asus.com/gain/93690588-7FFD-41C1-8BA8-ED7BFC973189/w1000/h732"
                alt="Product-img"
              />
            </div>
            <div className="left p-5 w-full md:w-1/2 rounded-md flex justify-center items-center flex-col">
              <div className="h-10 w-1/2 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 rounded-md text-center font-poppins flex justify-center items-center hover:scale-125 delay-100">
                <span className="lg:text-lg lg:font-semibold text-primary font-bold">
                  ROG Laptops
                </span>
              </div>
              <p className="text-blue-200 text-center mt-5 lg:mt-5 font-poppins font-bold text-xl lg:text-2xl">
                Sale Upto 20% Off
              </p>
              <p className="text-center text-white font-semibold text-xl lg:text-3xl">
                ROG Gameing Laptops.
              </p>
              <div className="h-10 w-1/2 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 rounded-md text-center font-poppins flex justify-center items-center hover:scale-125 delay-100">
                <span className="lg:text-lg lg:font-semibold text-primary font-bold">
                  ROG Strix SCAR 17 (2023) G733
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
