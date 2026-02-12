import React, { useContext } from "react";

import GlobalState from "../../../GlobalState";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;

  const increase = (id) => {
    const newCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setCart(newCart);
  };

  const decrease = (id) => {
    const newCart = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity === 1 ? 1 : item.quantity - 1 }
        : item,
    );
    setCart(newCart);
  };

  const removeItem = (id) => {
    if (window.confirm("Remove this product from cart?")) {
      setCart(cart.filter((item) => item._id !== id));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>Cart Empty</h2>
    );

  // const checkout = async () => {
  //   try {
  //     await authApi.post(
  //       `/api/order`,
  //       { cart },
  //       // { headers: { Authorization: token } },
  //       { headers: { Authorization: `Bearer ${token}` } },
  //     );

  //     alert("Order placed successfully ✅");
  //     setCart([]);
  //     window.location.href = "/history";
  //   } catch (err) {
  //     alert(err.response?.data?.msg || "Checkout failed");
  //   }
  // };
  const checkout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <div className="cart-items">
        {cart.map((product) => (
          <div className="cart-card" key={product._id}>
            <img src={product.images.url} alt={product.title} />

            <div className="cart-info">
              <h2>{product.title}</h2>
              <p>₹{product.price}</p>

              <div className="quantity">
                <button onClick={() => decrease(product._id)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => increase(product._id)}>+</button>
              </div>

              <p className="total-item">
                Total: ₹{product.price * product.quantity}
              </p>

              <button
                className="remove-btn"
                onClick={() => removeItem(product._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <h2>Grand Total: ₹{total}</h2>
        <button className="checkout-btn" onClick={checkout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
