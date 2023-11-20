import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="  w-full p-5 ">
        <div className=" flex  flex-col">
          <h1 className="text-center mt-5 font-bold text-2xl font-poppins">Search Results.</h1>
          <h6 className="text-center">
          {values?.results ? (
              values.results.length > 0
                ? (<span className="font-semibold text-xl font-poppins">Found <span className="text-orange-500">{values.results.length}</span> Items</span> )
                :( <span className="font-semibold text-xl font-poppins">No <span className="text-orange-500">Product</span> Found 😔</span> 
                
                )
            ) : <span className="font-semibold text-xl font-poppins">No <span className="text-orange-500">Product</span> Found 😔</span>}
          </h6>
        </div>
        {values?.results ?(
        <div className="grid  grid-cols-1 mb-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mx-3">
          {values?.results.map((p) => (
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
        </div>) : null
          
        }
      </div>
    </Layout>
  );
};

export default Search;
