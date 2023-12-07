import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast, { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  // Get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        import.meta.env.VITE_URL + `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("unable to get All products");
    }
  };
  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);

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

  return (
    <Layout title={"products Shopify"}>
      <div
        style={{ maxWidth: "100vw", maxHeight: "screen" }}
        className="container flex bg-gray-50"
      >
        <div className="">
          <AdminMenu />
        </div>
        <div className="main  w-full ">
          <div className="flex justify-center items-center">
            <h1 className=" font-poppins text-2xl mb-3.5 font-semibold mt-4 ">
              All Listed Products
            </h1>
          </div>
          <div className="grid grid-cols-1 mb-3 xxs:grid-cols-2  xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mx-3">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="product-card p-4 h-max bg-gradient-to-r from-slate-100 via-sky-100 to-blue-100  shadow-lg rounded-2xl border-[2px] border-slate-400">
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
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
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
                    <p className="text-center font-poppins text-blue-900 text-sm">
                      {p.description.substring(0, 30)}...
                    </p>
                    <div className="flex justify-between">
                    <h3 className="text-base font-bold rounded-lg mx-9 xs:mx-1 sm:mx-2 md:mx-2">
                      ₹ :{" "}
                      <span className="text-sm font-semibold">{p.price}</span>
                    </h3>  
                    <h3 className="text-base font-bold rounded-lg mx-9 xs:mx-1 sm:mx-2 md:mx-2">
                      Qty :{" "}
                      <span className="text-sm font-semibold">{p.quantity}</span>
                    </h3>
                    </div> 
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className=" p-3 w-full flex justify-center items-center mb-5 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 mt-5 rounded-lg ">
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
        </div>
      </div>
    </Layout>
  );
};

export default Products;
