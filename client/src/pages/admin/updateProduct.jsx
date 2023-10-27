import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_URL + `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();

    //eslint-disable-next-line
  }, []);
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
  // handle Update Api Call
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("quantity", quantity);

      const { data } = await axios.put(
        import.meta.env.VITE_URL + `/api/v1/product/Update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("product Updated SuccessFully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };
 
    //delete a product
    const handleDelete = async () => {
      try {
        let answer = window.prompt("Are You Sure want to delete this product ? ");
        if (!answer) return;
        const { data } = await axios.delete(import.meta.env.VITE_URL +
          `/api/v1/product/delete-product/${id}`
        );
        toast.success("Product Deleted Succfully");
        navigate("/dashboard/admin/products");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

  return (
    <Layout title={"create-product shofiy"}>
      <div style={{ maxWidth: "100vw" }} className="container flex bg-gray-50">
        <div className="">
          <AdminMenu />
        </div>
        <div className="main  w-full ">
          <div className=" flex flex-col mx-2 items-center ">
            <h1 className=" font-poppins text-2xl mb-3.5 font-semibold mt-4 ">
              Update Product
            </h1>
            <div className="m-2 w-[70%] ">
              <Select
                bordered={false}
                placeholder="Search Category"
                size="large"
                showSearch
                className="select-text h-[100%] w-[100%]  bg-gray-50  rounded-lg shadow-primary shadow-md "
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
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
              {photo ? (
                <div className="flex justify-center items-center ">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="h-[35%] w-[35%] shadow-primary shadow-md  "
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center ">
                  <img
                    src={
                      import.meta.env.VITE_URL +
                      `/api/v1/product/product-photo/${id}`
                    }
                    alt="product_photo"
                    className="h-[35%] w-[35%] shadow-primary shadow-md  "
                  />
                </div>
              )}
            </div>
            <div className="mt-3 w-[70%]">
              <label
                htmlFor="email"
                className="block mb-2 text-md font-medium text-gray-900 font-poppins"
              >
                Name Of Product :
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                className="bg-gray-50 border outline-none  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-primary shadow-md "
                placeholder="Name Of Product"
                required
              />
            </div>
            <div className="mt-3  w-[70%]">
              <label
                htmlFor="email"
                className="block mb-2 text-md font-medium text-gray-900 font-poppins"
              >
                Describe Product :
              </label>
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                className="bg-gray-50 border outline-none  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-primary shadow-md "
                placeholder="Describe Your Product"
                required
              />
            </div>
            <div className="mt-3 w-[70%]">
              <label
                htmlFor="email"
                className="block mb-2 text-md font-medium text-gray-900 font-poppins"
              >
                Product Price :
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                id="price"
                className="bg-gray-50 border outline-none  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-primary shadow-md "
                placeholder="Name Of Product"
                required
              />
            </div>
            <div className="mt-3 w-[70%]">
              <label
                htmlFor="email"
                className="block mb-2 text-md font-medium text-gray-900 font-poppins"
              >
                Product Quantity :
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                id="quantity"
                className="bg-gray-50 border outline-none  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-primary shadow-md "
                placeholder="Name Of Product"
                required
              />
            </div>
            <div className="mt-3 w-[70%]">
              <label className="block mb-2 text-md font-medium text-gray-900 font-poppins">
                Shipping :
              </label>
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="select-text h-[100%] w-[100%]  bg-gray-50  rounded-lg shadow-primary shadow-md "
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping ? "Yes" : "No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="flex justify-center   items-center mb-5 mt-3 w-[70%]">
              <button
                type="submit"
                onClick={handleUpdate}
                className="flex justify-center bg-slate-600 hover:bg-slate-700 m-2 font-poppins text-gray-50 hover:text-white h-full w-1/2 p-2 rounded-md shadow-blue-800 shadow-md"
              >
                <svg
                  className="w-3.5 h-3.5 text-gray-800 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 20 18"
                >
                  <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                  <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                </svg>
                Update Product
              </button>
              <button
                type="submit"
                onClick={handleDelete}
                className="flex justify-center bg-rose-500 m-2 hover:bg-rose-600 font-poppins text-gray-50 hover:text-white h-full w-1/2 p-2 rounded-md shadow-blue-800 shadow-md"
              >
                <svg
                  className="w-3.5 h-3.5 text-gray-800 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 20 18"
                >
                  <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                </svg>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
