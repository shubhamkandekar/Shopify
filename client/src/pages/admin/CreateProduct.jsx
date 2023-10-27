import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCatogry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();
  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_URL + "/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went Wrong In getting Category");
     
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  // handle sumbit 
   const handleSubmit = async(e)=>{
     e.preventDefault();
     try {
      const productData = new FormData()
      productData.append("name",name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("photo", photo)
      productData.append("category", category)
      productData.append("quantity", quantity)

      const {data} = await axios.post(import.meta.env.VITE_URL + "/api/v1/product/create-product", productData )
       if(data?.success){
        toast.success('product Created SuccessFully')
        navigate('/dashboard/admin/products')
       }else{
        toast.error(data?.message)
       }
     } catch (error) {
      console.log(error)
      toast.error('Something went Wrong');
     }
   }
  return (
    <Layout title={"create-product shofiy"}>
      <div
        style={{ maxWidth: "100vw"}}
        className="container flex bg-gray-50"
      >
        <div className="">
          <AdminMenu />
        </div>
        <div className="main  w-full ">
          <div className=" flex flex-col mx-2 items-center ">
            <h1 className=" font-poppins text-2xl mb-3.5 font-semibold mt-4 ">
              Create Product
            </h1>
            <div className="m-2 w-[70%] ">
              <Select
                bordered={false}
                placeholder="Search Category"
                size="large"
                showSearch
                className="select-text h-[100%] w-[100%]  bg-gray-50  rounded-lg shadow-primary shadow-md "
                onChange={(value) => {
                  setCatogry(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className=" flex justify-center items-center mt-3 w-[70%] h-10 cursor-pointer rounded-lg bg-gray-50 shadow-primary shadow-md">
              <label className="font-poppins cursor-pointer text-gray-500 font-semibold hover:underline">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <p className="mt-2 text-sm text-gray-500 " id="file_input_help">
              SVG, PNG, JPG or GIF (MAX.1mb).
            </p>
            <div className=" mt-6 ">
              {photo && (
                <div className="flex justify-center items-center ">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="h-[35%] w-[35%] shadow-primary shadow-md  "
                  />
                </div>
              )}
            </div>
             <div className="mt-3 w-[70%]">
          <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 font-poppins">Name Of Product :</label>
          <input type="text" value={name} onChange=
           {(e) => setName(e.target.value)}
          id="name" className="bg-gray-50 border outline-none  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-primary shadow-md " placeholder="Name Of Product" required />
            </div>
            <div className="mt-3  w-[70%]">
          <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 font-poppins">Describe Product :</label>
          <textarea type="text" value={description} onChange=
           {(e) => setDescription(e.target.value)}
          id="description" className="bg-gray-50 border outline-none  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-primary shadow-md " placeholder="Describe Your Product" required />
            </div>
            <div className="mt-3 w-[70%]">
          <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 font-poppins"> Product Price :</label>
          <input type="number" value={price} onChange=
           {(e) => setPrice(e.target.value)}
          id="price" className="bg-gray-50 border outline-none  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-primary shadow-md " placeholder="Name Of Product" required />
            </div>
            <div className="mt-3 w-[70%]">
          <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 font-poppins"> Product Quantity :</label>
          <input type="number" value={quantity} onChange=
           {(e) => setQuantity(e.target.value)}
          id="quantity" className="bg-gray-50 border outline-none  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-primary shadow-md " placeholder="Name Of Product" required />
            </div>
            <div className="mt-3 w-[70%]">
          <label  className="block mb-2 text-md font-medium text-gray-900 font-poppins"> Shipping :</label>
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="select-text h-[100%] w-[100%]  bg-gray-50  rounded-lg shadow-primary shadow-md "
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
            </div> 
            <div className="flex justify-center items-center mb-5 mt-3 w-[70%]" >
              <button type="submit" onClick={handleSubmit} className="bg-slate-600 hover:bg-slate-500 font-poppins text-gray-50 hover:text-white h-full w-1/2 p-2 rounded-md shadow-blue-800 shadow-md">
                 Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
