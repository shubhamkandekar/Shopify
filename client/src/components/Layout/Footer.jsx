import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="dark:bg-gray-900  p-3">
      <h4 className="text-dimWhite text-center px-5 text-lg">
        All Rights Reserve &copy; Shubham kandekar
      </h4>
      <ul className="flex justify-center gap-x-5 text-center mt-2 text-white font-poppins">
      <li className="p-2 hover:text-blue-500">
      <Link to="/about">
       About 
      </Link>
      </li>
      <li className="px-3 py-2 hover:text-blue-500 border-x-2 border-dimWhite">
      <Link to="/contact">
       Contact
      </Link>
      </li>
      <li className="p-2 hover:text-blue-500 ">
      <Link to="/policy">
       Policy
      </Link>
      </li>
      </ul>

    </div>
  );
};

export default Footer;
