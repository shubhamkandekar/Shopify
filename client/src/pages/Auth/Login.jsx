import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_URL+"/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(res.data.error);
    }
  };
  return (
    <Layout title={"login -shopify"}>
      <section className="h-screen bg-cover bg-center bg-[url('https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=1060&t=st=1697133419~exp=1697134019~hmac=a2cd9c6f186996cc034ca4bffb4c619a76bd08fe3c6a9b65909c4729458f585f')] ">
        <div className="flex flex-col items-center md:mx-5 sm:mx-5 ss:mx-24 xs:mx-16 justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                Login your account
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
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-primary font-poppins "
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="flex items-center justify-end pb-1 border-b-2 border-blue-600">
                  
                  <a
                    type="button"
                    onClick={()=> {navigate('/forgotpassword')}}
                    className="text-sm font-medium text-primary hover:underline "
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="flex items-start"></div>
                <button
                  type="submit"
                  className="w-full  text-white bg-purple-600 hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Login account
                </button>
                <p className="text-sm font-poppins font-light text-primary ">
                  Dont't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-blue-700 hover:underline "
                  >
                    Signup
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
