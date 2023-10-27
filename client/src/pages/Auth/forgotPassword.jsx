import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const forgotPassword = () => {
  const [email, setEmail] = useState("");
  const [ newPassword, setnewPassword] = useState("");
  const [answer, setAnswer] = useState("");
 
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_URL+"/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  return (
    <Layout title={'reset-paswword -shopify'}>
      <section className="screen bg-cover bg-center bg-[url('https://img.freepik.com/free-vector/phishing-account-with-laptop_23-2148555135.jpg?w=996&t=st=1697175144~exp=1697175744~hmac=6948bb3a65a372b0071ad67a09bef0b084c50edd1bd03bd5bfc26fa8bd6592ff')] ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex font-poppins items-center mb-6 text-3xl font-semibold text-gray-900 filter drop-shadow-lg "
          >
            <img
              className="w-8 h-8 mr-2 filter drop-shadow-lg"
              src="/logo.png"
              alt="logo"
            />
            Shopify
          </Link>
          <div className="w-full bg-gray-200 bg-opacity-75 rounded-lg shadow-xl  md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 flex flex-col space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-poppins font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Reset Password
              </h1>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-2"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-primary font-poppins "
                  >
                    Your email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="answer"
                    className="block mb-2 text-sm font-medium text-primary font-poppins "
                  >
                    Answer
                  </label>
                  <input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    type="text"
                    name="answer"
                    id="answer"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Who is Your Bestfriend?"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-primary font-poppins "
                  >
                    New Password
                  </label>
                  <input
                    value={ newPassword}
                    onChange={(e) => setnewPassword(e.target.value)}
                    type="password"
                    name="newpassword"
                    id="newpassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="flex items-start"></div>
                <button
                  type="submit"
                  className="w-full  text-white bg-purple-600 hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default forgotPassword;
