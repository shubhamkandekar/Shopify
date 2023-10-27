import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={'Dashboard -Shopify'}>
       <div className="container flex">
        <div className="flex-shrink-0">
          <UserMenu />
        </div>
        <div className="flex flex-col flex-1">
          <div className="max-w-screen-lg mx-auto p-4 flex  ">
            <div className="card items-start w-auto">
              <h3 className='text-lg font-bold font-poppins'>user Name: <span className='font-medium'>{auth?.user?.name}</span></h3>
              <h3 className='text-lg font-bold font-poppins'>User Email: <span className='font-medium'>{auth?.user?.email}</span></h3>
              <h3 className='text-lg font-bold font-poppins'>user contact: <span className='font-medium'>{auth?.user?.phone}</span></h3>
              <h3 className='text-lg font-bold font-poppins'>user Address: <span className='font-medium'>{auth?.user?.address}</span></h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard