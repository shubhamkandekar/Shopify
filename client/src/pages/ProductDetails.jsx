import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([])
  const navigate = useNavigate()


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
      getSmilarProduct(data?.product._id, data?.product.category._id)
    } catch (error) {
      console.log(error);
    }
  };
  
  // get similar Product
   const getSmilarProduct = async(pid, cid)=>{
    try {
      const {data} = await axios.get( import.meta.env.VITE_URL + `/api/v1/product//related-product/${pid}/${cid}`)
      setRelatedProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
   }


  return (
    <Layout>
      <div className="container mx-auto mt-2 p-4 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 lg:mt-10 lg:mr-5">
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
          <h1 className="text-2xl md:text-3xl font-semibold text-center">
            Product Details
          </h1>
          <h6 className="text-lg mt-4">Name: {product.name}</h6>
          <h6 className="text-lg mt-2">Description: {product.description}</h6>
          <h6 className="text-lg mt-2">Price: ${product.price}</h6>
          <h6 className="text-lg mt-2">Category: {product.category?.name}</h6>
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
      <hr />
      <div className="container mx-auto mt-8 ">
        <h1 className="text-2xl font-semibold">Similar products</h1>
        {relatedProducts.length < 0 && <p className="text-2xl font-semibold">No Smilar Product Found</p>}
        <div className="grid  grid-cols-1 mb-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mx-3">
          {relatedProducts?.map((p) => (
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
                <div className="flex justify-between mt-2 mx-9">
                  <h3 className="text-base font-bold bg-slate-100 p-2 rounded-lg">
                   ₹ : <span>{p.price}</span>
                  </h3>
                  
                </div>
                <div className="flex justify-between mt-2 mx-9 xs:mx-1 sm:mx-2 md:mx-2">
                    <button 
                    onClick={()=>navigate(`/product/${p.slug}`)}
                    className="p-1.5 bg-purple-500 hover:bg-purple-600 rounded-md text-white font-poppins shadow-md shadow-gray-300">
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
      </div>
    </Layout>
  );
};

export default ProductDetails;
