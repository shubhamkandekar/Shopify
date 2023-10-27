import React from "react";
import { useSearch } from '../../context/search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(import.meta.env.VITE_URL +`/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate("/Search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="relative " onSubmit={handleSubmit}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search-navbar"
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          value={values.keyword}
          onChange={(e) => setValues({ keyword: e.target.value })}
        >
        </input>
        
      </form>
    </div>
  );
};

export default SearchInput;
