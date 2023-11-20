import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // Intial load time
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_URL + `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSmilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar Product
  const getSmilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_URL +
          `/api/v1/product//related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"product-view shopify"}>
      <div className="h-max p-5">
        <div className="container mx-auto mt-2 p-4 flex flex-col md:flex-row border-slate-400 border-b-[3px] pb-10">
          <div className="w-full h-full md:w-1/2 lg:mt-24 lg:mr-5 bg-white rounded-2xl">
            <img
              src={
                import.meta.env.VITE_URL +
                `/api/v1/product/product-photo/${product._id}`
              }
              className="object-contain w-full  h-64 rounded-lg shadow-lg"
              alt={product.name}
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center mt-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-center border-slate-400 border-b-[3px] pb-0.5 text-blue-900">
              Product Details
            </h1>
            <h6 className="text-lg mt-2.5 font-poppins font-bold ">
              Name:{" "}
              <span className="font-medium text-orange-400">
                {product.name}
              </span>
            </h6>
            <h6 className="text-lg mt-1 font-poppins font-bold">
              Price:{" "}
              <span className="font-medium text-gray-600">
                ₹{product.price}
              </span>
            </h6>
            <div className="flex revievw p-0.5  ">
              <svg
                width={30}
                height={30}
                viewBox="0 0 30 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:fill-yellow-500"
              >
                <path
                  d="M17.1066 5.00154L19.2994 9.3872C19.5984 9.99771 20.3958 10.5833 21.0686 10.6954L25.0431 11.3558C27.5848 11.7794 28.1829 13.6234 26.3514 15.4424L23.2615 18.5323C22.7382 19.0556 22.4516 20.0648 22.6136 20.7874L23.4982 24.6124C24.1959 27.6401 22.5887 28.8112 19.9099 27.2289L16.1846 25.0236C15.5118 24.6249 14.4029 24.6249 13.7176 25.0236L9.99232 27.2289C7.32604 28.8112 5.70633 27.6276 6.40405 24.6124L7.28866 20.7874C7.45063 20.0648 7.16407 19.0556 6.64078 18.5323L3.55087 15.4424C1.73182 13.6234 2.3174 11.7794 4.8591 11.3558L8.83361 10.6954C9.49395 10.5833 10.2913 9.99771 10.5904 9.3872L12.7832 5.00154C13.9793 2.62181 15.9229 2.62181 17.1066 5.00154Z"
                  stroke="#D4A80A"
                  strokeWidth="1.86889"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width={30}
                height={30}
                viewBox="0 0 30 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:fill-yellow-500"
              >
                <path
                  d="M17.1066 5.00154L19.2994 9.3872C19.5984 9.99771 20.3958 10.5833 21.0686 10.6954L25.0431 11.3558C27.5848 11.7794 28.1829 13.6234 26.3514 15.4424L23.2615 18.5323C22.7382 19.0556 22.4516 20.0648 22.6136 20.7874L23.4982 24.6124C24.1959 27.6401 22.5887 28.8112 19.9099 27.2289L16.1846 25.0236C15.5118 24.6249 14.4029 24.6249 13.7176 25.0236L9.99232 27.2289C7.32604 28.8112 5.70633 27.6276 6.40405 24.6124L7.28866 20.7874C7.45063 20.0648 7.16407 19.0556 6.64078 18.5323L3.55087 15.4424C1.73182 13.6234 2.3174 11.7794 4.8591 11.3558L8.83361 10.6954C9.49395 10.5833 10.2913 9.99771 10.5904 9.3872L12.7832 5.00154C13.9793 2.62181 15.9229 2.62181 17.1066 5.00154Z"
                  stroke="#D4A80A"
                  strokeWidth="1.86889"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width={30}
                height={30}
                viewBox="0 0 30 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:fill-yellow-500"
              >
                <path
                  d="M17.1066 5.00154L19.2994 9.3872C19.5984 9.99771 20.3958 10.5833 21.0686 10.6954L25.0431 11.3558C27.5848 11.7794 28.1829 13.6234 26.3514 15.4424L23.2615 18.5323C22.7382 19.0556 22.4516 20.0648 22.6136 20.7874L23.4982 24.6124C24.1959 27.6401 22.5887 28.8112 19.9099 27.2289L16.1846 25.0236C15.5118 24.6249 14.4029 24.6249 13.7176 25.0236L9.99232 27.2289C7.32604 28.8112 5.70633 27.6276 6.40405 24.6124L7.28866 20.7874C7.45063 20.0648 7.16407 19.0556 6.64078 18.5323L3.55087 15.4424C1.73182 13.6234 2.3174 11.7794 4.8591 11.3558L8.83361 10.6954C9.49395 10.5833 10.2913 9.99771 10.5904 9.3872L12.7832 5.00154C13.9793 2.62181 15.9229 2.62181 17.1066 5.00154Z"
                  stroke="#D4A80A"
                  strokeWidth="1.86889"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width={30}
                height={30}
                viewBox="0 0 30 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:fill-yellow-500"
              >
                <path
                  d="M17.1066 5.00154L19.2994 9.3872C19.5984 9.99771 20.3958 10.5833 21.0686 10.6954L25.0431 11.3558C27.5848 11.7794 28.1829 13.6234 26.3514 15.4424L23.2615 18.5323C22.7382 19.0556 22.4516 20.0648 22.6136 20.7874L23.4982 24.6124C24.1959 27.6401 22.5887 28.8112 19.9099 27.2289L16.1846 25.0236C15.5118 24.6249 14.4029 24.6249 13.7176 25.0236L9.99232 27.2289C7.32604 28.8112 5.70633 27.6276 6.40405 24.6124L7.28866 20.7874C7.45063 20.0648 7.16407 19.0556 6.64078 18.5323L3.55087 15.4424C1.73182 13.6234 2.3174 11.7794 4.8591 11.3558L8.83361 10.6954C9.49395 10.5833 10.2913 9.99771 10.5904 9.3872L12.7832 5.00154C13.9793 2.62181 15.9229 2.62181 17.1066 5.00154Z"
                  stroke="#D4A80A"
                  strokeWidth="1.86889"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width={30}
                height={30}
                viewBox="0 0 30 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:fill-yellow-500"
              >
                <path
                  d="M17.1066 5.00154L19.2994 9.3872C19.5984 9.99771 20.3958 10.5833 21.0686 10.6954L25.0431 11.3558C27.5848 11.7794 28.1829 13.6234 26.3514 15.4424L23.2615 18.5323C22.7382 19.0556 22.4516 20.0648 22.6136 20.7874L23.4982 24.6124C24.1959 27.6401 22.5887 28.8112 19.9099 27.2289L16.1846 25.0236C15.5118 24.6249 14.4029 24.6249 13.7176 25.0236L9.99232 27.2289C7.32604 28.8112 5.70633 27.6276 6.40405 24.6124L7.28866 20.7874C7.45063 20.0648 7.16407 19.0556 6.64078 18.5323L3.55087 15.4424C1.73182 13.6234 2.3174 11.7794 4.8591 11.3558L8.83361 10.6954C9.49395 10.5833 10.2913 9.99771 10.5904 9.3872L12.7832 5.00154C13.9793 2.62181 15.9229 2.62181 17.1066 5.00154Z"
                  stroke="#D4A80A"
                  strokeWidth="1.86889"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="m-2 font-poppins"> No reviews</p>
            </div>
            <h6 className="text-lg mt-1 font-poppins font-bold flex items-center">
              Availiability:{" "}
              <svg
                width="23"
                height="14"
                viewBox="0 0 23 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-5"
              >
                <path
                  d="M1.08154 8.03061L7.80831 14.7653L21.2856 1.29591"
                  stroke="#22C25E"
                  strokeWidth="1.68367"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-green-500 ml-3"> In stock</span>
            </h6>
            <p className="font-poppins border-b-2 border-slate-400 p-2"> hurry up! only <span className="text-orange-400"> {product?.quantity} </span> items left in stock </p>

            <h6 className="text-lg mt-1 font-poppins font-bold">
              Description:{" "}
              <span className="font-medium text-gray-600">
                {product.description}
              </span>
            </h6>
            <h6 className="text-lg mt-1 font-poppins font-bold">
              Category:{" "}
              <span className="font-medium text-gray-600">
                {product.category?.name}
              </span>
            </h6>
            <button
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item Added To Cart");
                navigate("/cart");
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
        <hr />
        <div className="container mx-auto mt-5 ">
          <h1 className="text-2xl font-semibold">Similar products</h1>
          {relatedProducts.length < 0 && (
            <p className="text-2xl font-semibold">No Smilar Product Found</p>
          )}
          <div className="grid  grid-cols-1 mb-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mx-3 ">
            {relatedProducts?.map((p) => (
              <div
                key={p._id}
                className="product-card p-4 h-max bg-slate-50 border-slate-400 border-[1px] rounded-2xl shadow-lg"
              >
                <div className="relative">
                  <img
                    src={
                      import.meta.env.VITE_URL +
                      `/api/v1/product/product-photo/${p._id}`
                    }
                    alt="Product Image"
                    className="w-full h-[24vw] lg:h-[12vw]  object-scale-down"
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
                  <h3 className="text-base font-bold rounded-lg mx-9 xs:mx-1 sm:mx-2 md:mx-2">
                    ₹ : <span className="text-sm font-semibold">{p.price}</span>
                  </h3>

                  <div className="flex justify-between mt-2 mx-9 xs:mx-1 sm:mx-2 md:mx-2">
                    <button
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
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
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Below Hero Section */}
        <div className="Hero-section lg:h-[20vw] h-max  bg-gradient-to-l from-gray-700 via-gray-900 to-black rounded-lg mt-4  shadow-lg flex flex-col md:flex-row mb-5 mx-10">
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
    </Layout>
  );
};

export default ProductDetails;
