import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={'Admin Dashboard shopify'}>
    <div className="container flex">
      <div className="flex-shrink-0">
        <AdminMenu />
      </div>
      <div className="flex flex-col flex-1">
        <div className="max-w-screen-lg mx-auto p-4 flex  ">
          <div className="card items-start w-auto">
            <h3 className='text-lg font-bold font-poppins'>Admin Name: <span className='font-medium'>{auth?.user?.name} </span></h3>
            <h3 className='text-lg font-bold font-poppins'>Admin Email: <span className='font-medium'>{auth?.user?.email} </span></h3>
            <h3 className='text-lg font-bold font-poppins'>Admin Contact: <span className='font-medium'>{auth?.user?.phone} </span></h3>
            
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default AdminDashboard