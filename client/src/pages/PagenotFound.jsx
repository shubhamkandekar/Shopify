import React from 'react';
import Layout from '../components/Layout/Layout';
import Nopage from '../assets/Nopage.jpg';
import { Link } from 'react-router-dom';

const PagenotFound = () => {
  return (
    <Layout title={"404 - Ecommerce app"}>
      <div className='flex flex-col lg:flex-row justify-center items-center  lg:mt-10  '>
        <img className="h-[30%] w-[50%]" src={Nopage} alt='404 Page Not Found' />
        <button className='p-3 font-semibold hover:text-lg font-poppins text-white bg-purple-600 hover:bg-purple-400 rounded-lg shadow-primary shadow-lg mb-10'><Link to='/'>Home</Link></button>
      </div>
    </Layout>
  )
}

export default PagenotFound;