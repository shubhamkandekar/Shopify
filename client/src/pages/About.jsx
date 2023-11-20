import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="max-w-screen-xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2">
            <img
              src="https://img.freepik.com/free-photo/about-as-service-contact-information-concept_53876-138509.jpg?w=900&t=st=1699308077~exp=1699308677~hmac=1bdd09eefce42c53f108327fc6e3f14ad85a5e187977533a8b59a56673b1c158"
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-lg border-4 border-white"
            />
          </div>
          <div className="md:order-1">
            <h1 className="text-4xl font-extrabold mb-4">Discover Our Story</h1>
            <p className="text-lg mb-6">
              We are more than just an ecommerce store. We are your partner in
              discovering the latest trends, style, and innovation. Our passion
              is to offer you a seamless shopping experience.
            </p>
            <p className="text-lg mb-6">
              From fashion to electronics, we curate a diverse range of
              high-quality products. Our commitment to you is to provide
              excellence in service, security in transactions, and satisfaction
              in every purchase.
            </p>
            <p className="text-lg">
              Our journey is a reflection of your trust in us. Thank you for
              being a part of our story. Together, we make shopping an
              adventure.
            </p>
          </div>
        </div>
      </div>
    </div> 
    </Layout>
  )
}

export default About