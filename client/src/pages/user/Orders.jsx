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
      <div className=" flex  ">
        <div className="">
          <UserMenu />
        </div>
        <div className="w-3/4 ">
          <div className=" flex flex-col w-full ">
            <h1 className="w-auto mt-5 font-poppins text-2xl md:text-3xl font-semibold text-center mb-4 bg-gradient-to-l from-blue-900 to-blue-950 rounded-lg text-white py-3 mx-3">
              <span className="text-orange-500">{auth?.user?.name}</span> Your
              Orders 🎉
            </h1>
            {orders?.map((o, i) => (
              <div
                key={i}
                className="bg-gradient-to-l from-blue-900 to-blue-950  bg-opacity-90 shadow-lg rounded-lg p-4 mb-4 mx-3"
              >
                <table className="w-full text-sm md:text-base lg:text-lg text-left text-gray-500  dark:text-gray-400">
                  <thead className="text-xs bg-gradient-to-tr from-blue-700 to-blue-300 text-white uppercase">
                    <tr className="border-b border-white text-center ">
                      <th scope="col" className=" border-r">
                        SR.No
                      </th>
                      <th scope="col" className=" border-r">
                        Status
                      </th>
                      <th scope="col" className=" border-r">
                        Buyer
                      </th>
                      <th scope="col" className=" border-r">
                        Date
                      </th>
                      <th scope="col" className=" border-r">
                        Payment
                      </th>
                      <th scope="col" className="">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b text-center font-poppins bg-gradient-to-tr  from-blue-400 to-blue-100 dark:border-gray-700 ">
                      <td className=" border-r text-gray-800 hover:text-blue-800">
                        {i + 1}
                      </td>
                      <td className=" border-r text-gray-800 hover:text-blue-800">
                        {o?.status}
                      </td>
                      <td className=" border-r text-gray-800 hover:text-blue-800">
                        {o?.buyer?.name}
                      </td>
                      <td className=" border-r text-gray-800 hover:text-blue-800">
                        {moment(o?.createAt).fromNow()}
                      </td>
                      <td className=" border-r text-gray-800 hover:text-blue-800">
                        {o?.payment.success ? "Success" : "Failed"}
                      </td>
                      <td className=" text-gray-800 hover:text-blue-800">
                        {o?.products?.length}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="h-1/3 " >
                  {o?.products?.map((p, i) => (
                    <div
                      key={i}
                      className=" mt-2 bg-white bg-opacity-90 shadow-lg rounded-lg p-4 mb-4 "
                    >
                      <div className=" flex justify-evenly items-center ">
                        
                        <img
                          src={
                            import.meta.env.VITE_URL +
                            `/api/v1/product/product-photo/${p._id}`
                          }
                          className="rounded-lg h-28 w-1/2 object-contain "
                          alt={p.name}
                        />
                      
                        <div className="border-slate-400 border-l-4 pl-10 ">
                        <p className="text-lg md:text-xl font-semibold text-blue-900">
                          {p.name}
                        </p>
                        <p className="text-sm md:text-base">{p.description}</p>
                        <p>₹: <span className="text-orange-500">{p.price}</span></p>
                      </div>
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
