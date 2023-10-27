import React from 'react'
import Layout from '../../components/Layout/Layout'
// import { useAuth } from '../../context/auth'
import AdminMenu from '../../components/Layout/AdminMenu'
const User = () => {
  return (
    <Layout title={'Allusers shofiy'}>
             <div className="container flex">
      <div className="flex-shrink-0">
        <AdminMenu />
      </div>
      <div className="flex flex-col flex-1">
        <div className="max-w-screen-lg mx-auto p-4 flex  ">
          <div className="card items-start w-auto">
           <h1>All Users</h1>
            
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default User