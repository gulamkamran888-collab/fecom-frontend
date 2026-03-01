import React, { createContext, useEffect, useState } from "react";
import ProductApi from "./api/ProductApi";
import axios from "axios";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";
export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/refreshtoken`,
        {
          withCredentials: true,
        },
      );
      localStorage.setItem("accessToken", res.data.accesstoken);
      setToken(res.data.accesstoken);
    } catch (error) {
      localStorage.removeItem("accessToken");
      setToken(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) refreshToken();
  }, []);

  const state = {
    token: [token, setToken],
    productAPI: ProductApi(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
export default GlobalState;
