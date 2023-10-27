import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
const Profile = () => {
  const [name, setName] = useState("");
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Initial time getting the (userData)
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        import.meta.env.VITE_URL + "/api/v1/auth/profile",
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"profile shopify"}>
      <div style={{ width: "100vw" }} className="container flex">
        <div className="flex-shrink-0">
          <UserMenu />
        </div>
        <div className="flex flex-col flex-1">
          <section className="screen w-full  bg-cover bg-center bg-[url('https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=1060&t=st=1697133419~exp=1697134019~hmac=a2cd9c6f186996cc034ca4bffb4c619a76bd08fe3c6a9b65909c4729458f585f')] ">
            <div className="flex flex-col  items-center md:mx-5 sm:mx-5 ss:mx-24 xs:mx-16 justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full  bg-gray-200 bg-opacity-75 rounded-lg shadow-xl  md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 flex flex-col space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-poppins font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    User Profile
                  </h1>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 md:space-y-2"
                    action="#"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-primary font-poppins "
                      >
                        Your Name
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="Name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-primary font-poppins "
                      >
                        Your email
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="name@gmail.com"
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-primary font-poppins "
                      >
                        Password
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-primary font-poppins "
                      >
                        Contact
                      </label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        name="phone"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Phone"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-primary font-poppins"
                      >
                        Address
                      </label>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        name="address"
                        id="address"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Your address"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full  text-white bg-purple-600 hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Update Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
