import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_URL + "/api/v1/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("unable to fetch the products");
    }
  };
  //Life Cycle Method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"products Shopify"}>
      <div style={{ maxWidth: "100vw" }} className="container flex bg-gray-50">
        <div className="">
          <AdminMenu />
        </div>
        <div className="main  w-full ">
          <div className="flex justify-center items-center">
            <h1 className=" font-poppins text-2xl mb-3.5 font-semibold mt-4 ">
              All Listed Products
            </h1>
          </div>
          <div className="grid grid-cols-1 mb-3  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-3">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="product-card p-4 bg-white rounded shadow-lg">
                  <img
                    src={import.meta.env.VITE_URL +`/api/v1/product/product-photo/${p._id}`}
                    alt="Product Image"
                    className="w-full h-40 object-contain"
                  />
                  <div className="product-details mt-4">
                    <h3 className="text-lg text-center font-semibold rounded-lg bg-slate-100 border-2 shadow-gray-300 shadow-sm">{p.name}</h3>
                    <p className="text-sm text-gray-700 text-center">
                      {p.description}
                    </p>
                    <div className="flex justify-between mt-2 mx-9">
                      <h3 className="text-base font-bold bg-slate-100 p-2 rounded-lg">RS : <span>{p.price}</span></h3>
                      <h3 className="text-base bg-slate-100 p-2 rounded-lg">Q : <span>{p.quantity}</span></h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;


