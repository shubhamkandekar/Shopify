import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import shopifyvideo from "../../public/shopify.mp4";

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
    setLoading(false);
    try {
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

  return (
    <Layout title={"All Products -shopify app"}>
      <div className="flex ">
        <div className="w-1/4 lg:w-[15%]  bg-gradient-to-br  from-blue-500 to-blue-100">
          <h4 className="text-center mx-1 mt-5 bg-gradient-to-l  from-blue-200 to-blue-100 text-blue-950 shadow-white shadow-sm p-1 rounded-md font-poppins">
            Filter By Category
          </h4>
          <div className="flex flex-col gap-y-2 mx-2">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                <span className="text-dimWhite hover:text-white font-semibold">{c.name}</span>
              </Checkbox>
            ))}
          </div>
          {/* Price Filter  */}
          <h4 className=" mt-10 text-center mx-1  bg-gradient-to-l  from-blue-200 to-blue-100 text-blue-950 shadow-white shadow-sm p-1 rounded-md font-poppins">
            Filter By Price
          </h4>
          <div className="flex flex-col gap-y-2 mx-2">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div className=" mt-2 mb-1 lg:mb-2.5" key={p._id}>
                  <Radio value={p.array}>
                    <span className="text-dimWhite hover:text-white font-semibold">
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
        </div>
        <div className="w-full bg-gradient-to-l  from-gray-200 to-blue-100">
          <div className="mt-2 mx-2 flex items-center justify-center text-white bg-gradient-to-tl from-blue-300 to-blue-500  shadow-primary shadow-md rounded-md">
            <div className="flex justify-center items-center">
              <h1 className="text-4xl mt-3 font-bold  ">Welcome to Shopify</h1>
            </div>
          </div>
          <div
            className="w-full object-cover rounded-md"
            style={{ height: "40vh", position: "relative" }}
          >
            <video
              src="../../public/shopify.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                height: "auto",
                marginTop:"10px",
                maxHeight: "100%",
                maxWidth: "100%",
                borderRadius:'10px'
              }}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <h1 className="text-center lg:text-lg mx-1 mt-3 bg-gradient-to-l  from-blue-200 to-blue-100 text-blue-950 shadow-white shadow-sm p-1 rounded-md font-poppins">
            All Products
          </h1>
          <div className="grid  grid-cols-1 mb-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mx-3">
            {products?.map((p) => (
              <div
                key={p._id}
                className="product-card p-4 bg-white rounded shadow-lg"
              >
                <img
                  src={
                    import.meta.env.VITE_URL +
                    `/api/v1/product/product-photo/${p._id}`
                  }
                  alt="Product Image"
                  className="w-full h-40 object-contain"
                />
                <div className="product-details mt-4">
                  <h3 className="text-lg text-center font-semibold rounded-lg bg-slate-100 border-2 shadow-gray-300 shadow-sm">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-700 text-center">
                    {p.description}
                  </p>
                  <div className="flex justify-between mt-2 mx-9 xs:mx-1 sm:mx-2 md:mx-2 ">
                    <h3 className="text-base font-bold bg-slate-100 p-2 rounded-lg">
                      RS : <span className="text-sm">{p.price}</span>
                    </h3>
                    <h3 className="text-base font-bold bg-slate-100 p-2 rounded-lg">
                      Qty : <span className="text-sm">{p.quantity}</span>
                    </h3>
                  </div>
                  <div className="flex justify-between mt-2 mx-9 xs:mx-1 sm:mx-2 md:mx-2">
                    <button
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="p-1.5 bg-purple-500 hover:bg-purple-600 rounded-md text-white font-poppins shadow-md shadow-gray-300"
                    >
                      More Details
                    </button>
                    <button
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added To Cart");
                      }}
                      className="p-1.5 flex justify-center items-center bg-amber-300 hover:bg-amber-400 text-blue-950 rounded-md shadow-md shadow-gray-300"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="mr-1 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                className="bg-rose-500 hover:bg-rose-600 text-white rounded-lg shodow-primary shadow-md p-2 font-poppins"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
