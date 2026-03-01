import axios from "axios";
import { useEffect, useState } from "react";
import authApi from "./authApi";
import Swal from "sweetalert2";

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
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (err) {
        console.log("Cart save error", err);
      }
    };

    saveCart();
  }, [cart, token, isLogged]);

  // 🛒 ADD TO CART
  const addCart = async (product) => {
    if (!isLogged) {
      await Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add items to cart",
      });
      return;
    }
    const check = cart.every((item) => item._id !== product._id);

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      Swal.fire({
        icon: "success",
        title: "Added to Cart 🛒",
        text: `${product.title} added successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // alert("Product already in cart");
      Swal.fire({
        icon: "info",
        title: "Already Added",
        text: "Product is already in your cart",
      });
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
