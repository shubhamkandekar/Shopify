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
      <div className="3/4 flex justify-center items-center  w-full ">
          <div className="w-full h-full mx-auto p-4 flex flex-col justify-center items-center">
            <div className="user-avatar h-36 rounded-[50%] w-auto bg-gradient-to-br from-slate-200 to-purple-300 text-white flex items-center justify-center mb-5 p-2">
              <span className="text-4xl font-bold text-primary">
                {auth?.user?.name}
              </span>
            </div>
            <div className="card w-auto p-6 rounded-lg shadow-lg bg-gradient-to-r from-purple-400 to-blue-500 text-white">
              <h2 className="text-4xl font-extrabold font-poppins mb-6">
                Welcome,{" "}
                <span className="text-orange-300">{auth?.user?.name}</span>🎆
              </h2>
              <div className="user-info">
                <div className="info-item mb-4">
                  <span className="text-lg font-semibold text-gray-700">
                    User Email:
                  </span>
                  <span className="text-lg font-medium ml-1">
                    {auth?.user?.email}
                  </span>
                </div>
                <div className="info-item mb-4">
                  <span className="text-lg font-semibold text-gray-700">
                    User Contact:
                  </span>
                  <span className="text-lg font-medium ml-1">
                    {auth?.user?.phone}
                  </span>
                </div>
                <div className="info-item">
                  <span className="text-lg font-semibold text-gray-700">
                    User Address:
                  </span>
                  <span className="text-lg font-medium ml-1">
                    {auth?.user?.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </Layout>
  )
}

export default AdminDashboard