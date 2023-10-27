import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/forms/categoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, settName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updated, setUpdated] = useState("");
  //handleform
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(import.meta.env.VITE_URL+
        "/api/v1/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(` New ${name} Category is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
 // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_URL+
        "/api/v1/category/get-category"
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

  //update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(import.meta.env.VITE_URL+
        `/api/v1/category/update-category/${selected._id}`,
        { name: updated }
      );
      if (data.success) {
        toast.success(`Category updated to: ${updated} `);
        setSelected(null);
        setUpdated("");
        setOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("something went Wrong");
    }
  };

  
  //delete Category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(import.meta.env.VITE_URL+
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(' Category is deleted ');
        getAllCategory();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("something went Wrong");
    }
  };

  return (
    <Layout title={"create-category shofify"}>
      <div
        style={{ maxWidth: "100vw" }}
        className="container flex bg-gray-50"
      >
        <div className="">
          <AdminMenu />
        </div>
        <div className="flex flex-col w-full">
          <div className="mx-auto p-4 flex w-full">
            <div className="card items-start w-full">
              <h1 className="text-center font-poppins text-2xl mb-3.5 font-semibold mt-4 ">
                Manage Category
              </h1>
              <div>
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={settName}
                />
              </div>
              <div className="relative overflow-x-0 shadow-primary shadow-lg  mx-auto">
                <table className="w-full  mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" className="px-6 py-3 ">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => (
                      <React.Fragment key={c._id}>
                        <tr className="border-b  dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:bg-gray-500"
                          >
                            {c.name}
                          </th>
                          <td className="flex gap-x-10 px-6 py-4  hover:text-blue-800">
                            <button
                              onClick={() => {
                                setOpen(true);
                                setUpdated(c.name);
                                setSelected(c);
                              }}
                              className=" flex items-center gap-x-1 font-medium text-blue-600 dark:text-blue-500  hover:underline"
                            >
                              <svg
                                className="w-3.5 h-3.5 text-gray-800"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gray"
                                viewBox="0 0 20 18"
                              >
                                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                              </svg>
                              Edit
                            </button>
                            <button
                            onClick={()=>{handleDelete(c._id)}}
                            className=" flex items-center gap-x-1 font-medium text-red-400   hover:underline">
                              <svg
                                className="w-3.5 h-3.5 text-gray-800"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gray"
                                viewBox="0 0 20 18"
                              >
                                <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                              </svg>
                              Delete
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
          <CategoryForm
            value={updated}
            setValue={setUpdated}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;
