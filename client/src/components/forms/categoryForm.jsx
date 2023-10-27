import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <div className="pb-3">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="website-admin"
            className="block mb-2  font-semibold text-lg text-gray-900 font-poppins"
          >
            Add Category :
          </label>
          <div className="flex w-[70%]">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
            </span>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="rounded-none rounded-r-lg  focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="Add New Category"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white shadow-primary shadow-md  p-3 rounded-md ml-3"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CategoryForm;
