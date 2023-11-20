import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
const CartPage = () => {
  const [clientToken, setClientToken] = useState("")
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [instance, setInstance] = useState("") 
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  

  //total Price of Items
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete items
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
 // get payment gatewaytoken
 const getToken = async ()=>{
  try {
    const {data} = await axios.get( import.meta.env.VITE_URL +'/api/v1/product/braintree/token')
    setClientToken(data?.clientToken)
  } catch (error) {
    console.log(error)
  }
 }
useEffect(()=>{
  getToken();
},[auth?.token])

// handle payment 
const handlePayment = async()=>{
  try {
    setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(import.meta.env.VITE_URL +"/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
  } catch (error) {
      console.log(error);
  }
}


  return (
    <Layout title={"Add to Card Shopify"}>
      <div className="p-5 sm:py-12 ">
        <div className="container mx-auto">
          <div className="bg-gradient-to-l from-blue-900 to-blue-950  p-6 rounded-lg shadow-md text-white text-center">
            <h1 className="text-3xl font-bold mb-2">
              {!auth?.user
                ? "Hello, Guest 😎"
                : `Hello, ${auth?.token && auth?.user?.name} 😎`}
            </h1>
            <p className="text-sm">
              {cart?.length ? (
                <span>
                  <span className="text-yellow-300 font-semibold">
                    {cart.length} item
                  </span>{" "}
                  in your cart {auth?.token ? "" : "Please login to checkout!"}
                </span>
              ) : (
                "Your Cart Is Empty 🥲 "
              )}
            </p>
          </div>

          <div className="md:flex mt-8">
            <div className="md:w-2/3 pr-4">
              {cart?.map((p) => (
                <div
                  className="mb-8 bg-white rounded-lg shadow-md p-4"
                  key={p._id}
                >
                  <div className=" flex border-slate-400 border-t-4  border-b-4 justify-evenly items-center">
                    <div className="w-1/2 lg:p-3">
                      <img
                        src={
                          import.meta.env.VITE_URL +
                          `/api/v1/product/product-photo/${p._id}`
                        }
                        className="w-full h-36 object-scale-down rounded-lg shadow-md bg-gradient-to-br from-blue-50 to-blue-400"
                        alt={p.name}
                      />
                    </div>
                    <div className="md:w-2/3 mt-5 md:mt-0 md:pl-4 relative">
                      <p className="text-2xl  font-semibold text-blue-800">
                        {p.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {p.description.substring(0, 30)}
                      </p>
                      <p className="text-lg font-semibold">Price: {p.price}</p>
                      <button
                      className="bg-red-500 hover:bg-red-600 text-white mb-1 py-2 px-4 rounded-lg shadow-md absolute left-32 bottom-0 lg:left-72 "
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                    </div>
                  </div>
                  
      
                 
                </div>
              ))}
            </div>

            <div className="md:w-1/3">
              <div className="bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-blue-600">
                  Cart Summary
                </h2>
                <p className="text-gray-600">Total | Checkout | Payment</p>
                <hr className="my-6 border-t-2 border-gray-200" />
                <h4 className="text-2xl font-semibold text-blue-600">
                  Total: {totalPrice()}
                </h4>
                 <div className="mt-6">
            {auth?.user?.address ? (
              <div className="mb-8">
                <h4 className="text-2xl font-semibold text-blue-600">Current Address</h4>
                <p className="text-gray-600">{auth?.user?.address}</p>
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md mt-4"
                  onClick={() => navigate('/dashboard/user/profile')}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-8">
                {auth?.token ? (
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md"
                    onClick={() => navigate('/dashboard/user/profile')}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md"
                    onClick={() => navigate('/login', { state: '/cart' })}
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="mt-8">
            {!clientToken || !auth?.token || !cart?.length ? (
              ''
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: 'vault',
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />

                <button
                  className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md text-xl"
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? 'Processing ....' : 'Make Payment'}
                </button>
              </>
            )}
          </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
