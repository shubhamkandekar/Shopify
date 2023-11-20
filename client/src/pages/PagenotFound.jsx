import React from 'react';
import Layout from '../components/Layout/Layout';
import Nopage from '../assets/Nopage.png';
import { Link } from 'react-router-dom';

const PagenotFound = () => {
  return (
    <Layout title={"404 - Ecommerce app"}>
      <div className='flex flex-col lg:flex-row justify-center items-center    '>
        <img className="h-[20%] w-[50%]  p-10 " src={Nopage} alt='404 Page Not Found' />
        <button className='p-3 font-semibold hover:text-lg font-poppins text-blue-900 bg-yellow-300 hover:bg-yellow-500-400 rounded-lg shadow-primary shadow-lg mb-10'><Link to='/'>Home</Link></button>
      </div>
    </Layout>
  )
}

export default PagenotFound;