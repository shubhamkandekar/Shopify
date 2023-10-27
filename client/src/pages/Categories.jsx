import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug]);
  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_URL +
          `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All categories"}>
      
      <div className="  mx-3 mt-2 bg-gradient-to-l  from-blue-300 to-blue-100 text-blue-950 shadow-white shadow-sm p-1 rounded-md font-poppins">
      <h1 className="text-center text-xl mt-5">Category : {category?.name}</h1>
      <h1 className="text-center mt-5">{products?.length} Results Found</h1>
      </div>
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
                <button className="p-1.5 flex justify-center items-center bg-amber-300 hover:bg-amber-400 text-blue-950 rounded-md shadow-md shadow-gray-300">
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
      
    </Layout>
  );
};

export default Categories;
