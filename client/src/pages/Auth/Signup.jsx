import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_URL+"/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer
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
    <Layout  title={"Register shopify"}>
      <section className="screen  bg-cover bg-center bg-[url('https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=1060&t=st=1697133419~exp=1697134019~hmac=a2cd9c6f186996cc034ca4bffb4c619a76bd08fe3c6a9b65909c4729458f585f')] ">
        <div className="flex flex-col  items-center md:mx-5 sm:mx-5 ss:mx-24 xs:mx-16 justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {/* <Link
            to="/"
            className="flex font-poppins mb-3 items-center  text-3xl font-semibold text-gray-900 filter drop-shadow-lg "
          >
            <img
              className="w-8 h-8 mr-2 filter drop-shadow-lg"
              src="/logo.png"
              alt="logo"
            />
            Shopify
          </Link> */}
          <div className="w-full  bg-gray-200 bg-opacity-75 rounded-lg shadow-xl  md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 flex flex-col space-y-4 md:space-y-6 sm:p-8">
              {/* <h1 className="text-xl font-poppins font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create and account
              </h1> */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-2"
                action="#"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-primary font-poppins "
                  >
                    Your Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="Name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Your Name"
                    required
                  />
                </div>
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
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-primary font-poppins "
                  >
                    Contact
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Phone"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-primary font-poppins"
                  >
                    Address
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    name="address"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Your address"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="answer"
                    className="block mb-2 text-sm font-medium text-primary font-poppins"
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
                <div className="flex items-start"></div>
                <button
                  type="submit"
                  className="w-full  text-white bg-purple-600 hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <p className="text-sm font-poppins font-light text-primary ">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-blue-700 hover:underline "
                  >
                    Login here
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

export default Signup;
