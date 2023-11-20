import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';
const Layout = ({ children,title,description,keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "75vh" }} className="bg-gradient-to-l  from-gray-200 to-blue-100">{children}
      <Toaster />
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps ={
  title: "Shopify-shopnow",
  description: "Ecommerce app using MERN Stack",
  keywords: "Mongodb,react,express,mongodb,fashion,footwear,clothing,earphone,electronics",
  author: "shubham kandekar"
}

export default Layout;
