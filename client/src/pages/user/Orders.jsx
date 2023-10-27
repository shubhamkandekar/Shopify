import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_URL + "/api/v1/auth/orders"
      );
      
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"orders shopify"}>
      <div className=" flex ">
        <div className="1/4">
          <UserMenu />
        </div>
        <div className="w-3/4">
          <div className="w-full mx-auto">
            <h1 className="mt-5 font-poppins text-2xl md:text-3xl font-semibold text-center mb-4 bg-gradient-to-tr from-blue-400 rounded-lg to-blue-100 py-3 mx-3">
              <span className="text-orange-500">{auth?.user?.name}</span> Your Orders 🎉
            </h1>
            {orders?.map((o, i) => (
              
              <div key={i} className="bg-gradient-to-br mx-3 from-blue-400 to-blue-100 bg-opacity-90 shadow-lg rounded-lg p-4 mb-4">
                <table className="w-full text-sm md:text-base lg:text-lg text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs bg-gradient-to-tr from-blue-700 to-blue-300 text-white uppercase">
                    <tr className="border-b border-white">
                      <th scope="col" className="px-4 md:px-6 py-2 md:py-3 lg:py-4 border-r">
                        SR.No
                      </th>
                      <th scope="col" className="px-4 md:px-6 py-2 md:py-3 lg:py-4 border-r">
                        Status
                      </th>
                      <th scope="col" className="px-4 md:px-6 py-2 md:py-3 lg:py-4 border-r">
                        Buyer
                      </th>
                      <th scope="col" className="px-4 md:px-6 py-2 md:py-3 lg:py-4 border-r">
                        Date
                      </th>
                      <th scope="col" className="px-4 md:px-6 py-2 md:py-3 lg:py-4 border-r">
                        Payment
                      </th>
                      <th scope="col" className="px-4 md:px-6 py-2 md:py-3 lg:py-4">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-gradient-to-tr  from-blue-400 to-blue-100 dark:border-gray-700">
                      <td className="px-4 md:px-6 py-2 md:py-3 lg:py-4 border-r text-gray-800 hover:text-blue-800">
                        {i + 1}
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-3 lg:py-4 border-r text-gray-800 hover:text-blue-800">
                        {o?.status}
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-3 lg:py-4 border-r text-gray-800 hover:text-blue-800">
                        {o?.buyer?.name}
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-3 lg:py-4 border-r text-gray-800 hover:text-blue-800">
                        {moment(o?.createAt).fromNow()}
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-3 lg:py-4 border-r text-gray-800 hover:text-blue-800">
                        {o?.payment.success ? "Success" : "Failed"}
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-3 lg:py-4 text-gray-800 hover:text-blue-800">
                        {o?.products?.length}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                {o?.products?.map((p, i)=> (
                    <div key={i} className=" mt-2 bg-gradient-to-tr from-blue-400 to-blue-100 bg-opacity-90 shadow-lg rounded-lg p-4 mb-4 flex flex-col md:flex-row">
                      <div className="w-1/2  ">
                        <img
                          src={
                            import.meta.env.VITE_URL +
                            `/api/v1/product/product-photo/${p._id}`
                          }
                          className="rounded-lg   w-1/2"
                          alt={p.name}
                          
                        />
                      </div>
                      <div className="w-full  p-2 ">
                        <p className="text-lg md:text-xl font-semibold">
                          {p.name}
                        </p>
                        <p className="text-sm md:text-base">{p.description}</p>
                        <p>Price: ₹{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;