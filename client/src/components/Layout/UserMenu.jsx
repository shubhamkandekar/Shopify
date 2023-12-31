import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
const UserMenu = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <>
      
      {!sidebarVisible && (
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 bg-blue-900 dark:focus:ring-gray-600"
          onClick={toggleSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
         )}

        {sidebarVisible && (<aside
          id="default-sidebar"
          className={`  left-0 z-40 lg:w-64 md:w-64 sm:w-40 ss:w-36 xs:w-36 xxs:w-32 transition-transform ${
            sidebarVisible ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 `}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto ">
            <div className="flex justify-between  pb-1 border-gray-700 border-b-2  items-center">
              <h4 className="text-center font-semibold font-poppins mt-1 ">
                User Panel
              </h4>

              <div className="flex justify-end p-2">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={toggleSidebar}
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.293 4.293A1 1 0 114.707 2.88L9 7.17l4.293-4.293a1 1 0 111.414 1.414L10.414 8l4.293 4.293a1 1 0 01-1.414 1.414L9 9.83l-4.293 4.293a1 1 0 01-1.414-1.414L7.586 8 3.293 3.707a1 1 0 01-.88-1.414z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <ul className="space-y-2 font-medium mt-2 ">
              <li className="border-gray-400 border-b-2 hover:border-none">
                <NavLink
                  to="/dashboard/user/profile"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-6 h-6 text-gray-800 hover:text-white group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
                </NavLink>
              </li>
              <li className="border-gray-400 border-b-2 hover:border-none">
                <NavLink
                  to="/dashboard/user/orders"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>)}
      
    </>
  );
};

export default UserMenu;
