import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../forms/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCatOpen, setisCatOpen] = useState(false);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };
  const toggleCat = () => {
    setisCatOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/");
  };
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900  ">
        <div
          id="navbar"
          className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
        >
          <a href="/" className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9216/9216580.png"
              className="h-8 mr-3"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white font-poppins ">
              Shopify
            </span>
          </a>
          <div className="">
            <SearchInput />
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isNavOpen}
            onClick={handleButtonClick}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isNavOpen ? "block" : "hidden"
            } w-full  md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-3 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li className="relative">
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent focus:outline-none"
                  onClick={toggleCat}
                >
                  Category
                  <svg
                    className={`w-2.5 h-2.5 ml-2.5 transform ${
                      isCatOpen ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  className={`${
                    isCatOpen ? "block" : "hidden"
                  } lg:absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow lg:w-44  dark:bg-gray-700 mt-5 flex flex-col justify-end dark:divide-gray-600`}
                  data-popper-placement="bottom"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownNavbarLink"
                  >
                    {categories?.map((c) => (
                      <li key={c._id} className="">
                        <Link
                          to={`/categories/${c.slug}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              {!auth.user ? (
                <>
                  <li>
                    <NavLink
                      to="/signup"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Signup
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/Login"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="relative">
                    <button
                      id="dropdownNavbarLink"
                      data-dropdown-toggle="dropdownNavbar"
                      className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent focus:outline-none"
                      onClick={toggleDropdown}
                    >
                      {auth?.user?.name}
                      <svg
                        className={`w-2.5 h-2.5 ml-2.5 transform ${
                          isDropdownOpen ? "rotate-180" : "rotate-0"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>

                    <div
                      className={`${
                        isDropdownOpen ? "block" : "hidden"
                      } lg:absolute z-10 lg:overflow-x-hidden  font-normal bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 mt-5 flex flex-col justify-end dark:divide-gray-600 `}
                      data-popper-placement="bottom"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-400"
                        aria-labelledby="dropdownNavbarLink"
                      >
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Dashboard
                          </NavLink>
                        </li>
                      </ul>
                      <div className="py-1">
                        <NavLink
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                        >
                          Sign out
                        </NavLink>
                      </div>
                    </div>
                  </li>
                </>
              )}
              <li>
                <Badge id="badge" count={cart?.length} showZero>
                  <NavLink
                    to="/cart"
                    className="block p-0  pl-3 lg:pl-1 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
