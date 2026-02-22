import React, { useContext } from "react";

import GlobalState from "../../../GlobalState";

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

  const checkout = () => {
    navigate("/checkout");
  };

  // return (
  //   <div className="cart-page">
  //     <div className="cart-items">
  //       {cart.map((product) => (
  //         <div className="cart-card" key={product._id}>
  //           <img src={product.images.url} alt={product.title} />

  //           <div className="cart-info">
  //             <h2>{product.title}</h2>
  //             <p>₹{product.price}</p>

  //             <div className="quantity">
  //               <button onClick={() => decrease(product._id)}>-</button>
  //               <span>{product.quantity}</span>
  //               <button onClick={() => increase(product._id)}>+</button>
  //             </div>

  //             <p className="total-item">
  //               Total: ₹{product.price * product.quantity}
  //             </p>

  //             <button
  //               className="remove-btn"
  //               onClick={() => removeItem(product._id)}
  //             >
  //               Remove
  //             </button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>

  //     {/* SUMMARY */}
  //     <div className="cart-summary">
  //       <h3>Order Summary</h3>
  //       <h2>Grand Total: ₹{total}</h2>
  //       <button className="checkout-btn" onClick={checkout}>
  //         Proceed to Checkout
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 p-6 flex flex-col sm:flex-row gap-6"
            >
              {/* IMAGE */}
              <div className="w-full sm:w-40 h-40 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={product.images.url}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* INFO */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                    {product.title}
                  </h2>
                  <p className="text-slate-600 text-base">₹{product.price}</p>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => decrease(product._id)}
                      className="px-4 py-2 text-lg hover:bg-slate-100 transition"
                    >
                      −
                    </button>
                    <span className="px-5 py-2 text-base font-medium">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => increase(product._id)}
                      className="px-4 py-2 text-lg hover:bg-slate-100 transition"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-base font-semibold text-slate-800">
                    ₹{product.price * product.quantity}
                  </p>
                </div>

                {/* REMOVE */}
                <div className="mt-4">
                  <button
                    onClick={() => removeItem(product._id)}
                    className="text-sm text-red-500 hover:text-red-600 transition font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 h-fit sticky top-24">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Order Summary
          </h3>

          <div className="flex justify-between text-base text-slate-600 mb-4">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="border-t border-slate-200 my-4"></div>

          <div className="flex justify-between text-lg font-semibold text-slate-900 mb-6">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={checkout}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
