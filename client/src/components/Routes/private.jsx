import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from '../Loader'

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();
  
    useEffect(() => {
      const authCheck = async () => {
        try {
          const res = await axios.get(import.meta.env.VITE_URL + "/api/v1/auth/user-auth");
          if (res.data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          setOk(false);
        }
      };
  
      if (auth?.token) {
        authCheck();
      }
    }, [auth?.token]);
  
    return ok ? <Outlet /> : <Loader />;
  };
  
  export default PrivateRoute;