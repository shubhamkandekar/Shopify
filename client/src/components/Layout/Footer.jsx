import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!setEmail){
      toast.error('Please Fill Email ')
    }else{
      toast.success('You will Get Lattest Updates')
    }
  }
  return (
    <div className="dark:bg-gray-900  p-3">
      <div className=" bg-gradient-to-r from-slate-100 via-sky-100 to-blue-100 min-h-max p-2 flex flex-col items-center mx-10 rounded-md m-5">
        <div className="w-full max-w-screen-lg flex flex-wrap justify-center">
          <div className="w-full min-h-max md:w-1/3 p-1">
            <div className=" p-1  rounded-lg  flex justify-center items-center lg:mt-2.5">
              <span className="font-poppins text-lg  text-sky-900 font-bold">
                Subscribe newsletter
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-1 ">
            <div className=" p-1  rounded-lg  flex justify-evenly ">
              <form
                onSubmit={handleSubmit}
                className="bg-orange-400 flex w-[70%] justify-around rounded-md"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-orange-400   sm:text-sm rounded-lg  block w-full p-2.5 outline-none
                border-green-200 placeholder-white text-white dark:focus:ring-lime-200 focus:border-lime-200"
                  placeholder="Enter Your Email Address to stay tune "
                  required
                />
                <button type="submit" className=" mr-2">
                  <svg
                    width={25}
                    height={24}
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hover:scale-110"
                  >
                    <path
                      d="M7.89999 6.31991L16.39 3.48991C20.2 2.21991 22.27 4.29991 21.01 8.10991L18.18 16.5999C16.28 22.3099 13.16 22.3099 11.26 16.5999L10.42 14.0799L7.89999 13.2399C2.18999 11.3399 2.18999 8.22991 7.89999 6.31991Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.61 13.6501L14.19 10.0601"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-1 ">
            <div className=" p-1  rounded-lg  flex justify-around">
              <div className="flex justify-between gap-x-5">
                <svg
                  width={46}
                  height={45}
                  viewBox="0 0 46 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.7375 34.6688V29.1937C10.7375 27.375 12.1625 25.7437 14.1875 25.7437C16.0063 25.7437 17.6375 27.1687 17.6375 29.1937V34.4625C17.6375 38.1187 14.6 41.1563 10.9438 41.1563C7.2875 41.1563 4.25 38.1 4.25 34.4625V22.9125C4.04375 12.375 12.3688 3.84375 22.9063 3.84375C33.4437 3.84375 41.75 12.375 41.75 22.7062V34.2563C41.75 37.9125 38.7125 40.95 35.0563 40.95C31.4 40.95 28.3625 37.9125 28.3625 34.2563V28.9875C28.3625 27.1687 29.7875 25.5375 31.8125 25.5375C33.6313 25.5375 35.2625 26.9625 35.2625 28.9875V34.6688"
                    stroke="#EDA415"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="font-poppins font-semibold">
                  Call us 24/7 : <br></br>
                  <span>(+91) 0123 567 789</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 className="text-dimWhite text-center px-5 text-lg">
        All Rights Reserve &copy; Shubham kandekar
      </h4>
      <ul className="flex justify-center gap-x-5 text-center mt-2 text-white font-poppins">
        <li className="p-2 hover:text-blue-500">
          <Link to="/about">About</Link>
        </li>
        <li className="px-3 py-2 hover:text-blue-500 border-x-2 border-dimWhite">
          <Link to="/contact">Contact</Link>
        </li>
        <li className="p-2 hover:text-blue-500 ">
          <Link to="/policy">Policy</Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
