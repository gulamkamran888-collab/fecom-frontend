import axios from "axios";
import { useEffect, useState } from "react";
import authApi from "./authApi";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  // 🔐 GET USER INFO
  useEffect(() => {
    if (!token) return; // 🔥 VERY IMPORTANT

    const getUser = async () => {
      try {
        const res = await authApi.get(`/user/info`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsLogged(true);
        setCart(res.data.cart || []);
        res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    getUser();
  }, [token]);

  // 💾 SAVE CART
  useEffect(() => {
    if (!token) return;
    if (!isLogged) return;

    const saveCart = async () => {
      try {
        await authApi.patch(
          "/user/addcart",
          { cart },
          // { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (err) {
        console.log("Cart save error", err);
      }
    };

    saveCart();
  }, [cart, token, isLogged]);

  // 🛒 ADD TO CART
  const addCart = (product) => {
    if (!isLogged) return alert("Please login");

    const check = cart.every((item) => item._id !== product._id);

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      alert("Product already in cart");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart,
  };
}

export default UserAPI;
