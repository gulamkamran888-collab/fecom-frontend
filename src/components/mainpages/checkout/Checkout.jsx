import React, { useContext, useEffect, useState } from "react";
// import GlobalState from "../../../GlobalState";
import authApi from "../../../api/authApi";

import GlobalState from "../../../GlobalState";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [showForm, setShowForm] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
    landmark: "",
  });

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const addNewAddress = async () => {
    try {
      const res = await authApi.patch("/user/addaddress", newAddress, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedAddress(res.data.addresses[res.data.addresses.length - 1]);
      setAddresses(res.data.addresses);

      setShowForm(false);

      alert("Address added successfully");
    } catch (err) {
      alert(err.response?.data?.msg || "Error adding address");
    }
  };

  useEffect(() => {
    if (token) {
      authApi.get("/user/info").then((res) => {
        setAddresses(res.data.addresses || []);
      });
    }
  }, [token]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    if (!selectedAddress) {
      return alert("Please select delivery address");
    }

    try {
      if (paymentMethod === "COD") {
        await authApi.post("/api/order", {
          cart,
          shippingAddress: selectedAddress,
          paymentMethod: "COD",
        });

        alert("Order placed successfully");
        setCart([]);
        await authApi.patch("/user/addcart", { cart: [] });

        navigate("/Success");
      } else {
        // Razorpay flow
        const { data } = await authApi.post(
          "/api/payment/create-order",
          { amount: total },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const options = {
          key: data.key,
          amount: data.amount,
          currency: "INR",
          name: "FST Ecom",
          order_id: data.order.id,
          handler: async function (response) {
            await authApi.post("/api/order", {
              cart,
              shippingAddress: selectedAddress,
              paymentMethod: "RAZORPAY",
            });

            alert("Payment successful");
            setCart([]);
            await authApi.patch("/user/addcart", { cart: [] });

            navigate("/Success");
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Order failed");
    }
  };

  // return (
  //   <div className="checkout-container">
  //     <div className="checkout-left">
  //       {/* ADDRESS */}
  //       <div className="card">
  //         <h3>Delivery Address</h3>

  //         {addresses.length === 0 && <p>No saved address. Please add one.</p>}

  //         {addresses.map((addr, index) => (
  //           <label key={index} className="address-box">
  //             <input
  //               type="radio"
  //               name="address"
  //               onChange={() => setSelectedAddress(addr)}
  //             />
  //             <div>
  //               <strong>{addr.fullName}</strong>
  //               <p>
  //                 {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
  //               </p>
  //               <p>Mobile: {addr.mobile}</p>
  //             </div>
  //           </label>
  //         ))}

  //         <button
  //           className="add-address-btn"
  //           onClick={() => setShowForm(!showForm)}
  //         >
  //           + Add New Address
  //         </button>

  //         {showForm && (
  //           <div className="address-form">
  //             <input
  //               type="text"
  //               name="fullName"
  //               placeholder="Full Name"
  //               onChange={handleChange}
  //             />
  //             <input
  //               type="text"
  //               name="mobile"
  //               placeholder="Mobile Number"
  //               onChange={handleChange}
  //             />
  //             <input
  //               type="text"
  //               name="pincode"
  //               placeholder="Pincode"
  //               onChange={handleChange}
  //             />
  //             <input
  //               type="text"
  //               name="addressLine"
  //               placeholder="Address Line"
  //               onChange={handleChange}
  //             />
  //             <input
  //               type="text"
  //               name="city"
  //               placeholder="City"
  //               onChange={handleChange}
  //             />
  //             <input
  //               type="text"
  //               name="state"
  //               placeholder="State"
  //               onChange={handleChange}
  //             />
  //             <input
  //               type="text"
  //               name="landmark"
  //               placeholder="Landmark"
  //               onChange={handleChange}
  //             />

  //             <button onClick={addNewAddress}>Save Address</button>
  //           </div>
  //         )}
  //       </div>

  //       {/* PAYMENT */}
  //       <div className="card">
  //         <h3>Payment Method</h3>

  //         <label className="payment-option">
  //           <input
  //             type="radio"
  //             value="COD"
  //             checked={paymentMethod === "COD"}
  //             onChange={(e) => setPaymentMethod(e.target.value)}
  //           />
  //           Cash on Delivery
  //         </label>

  //         <label className="payment-option">
  //           <input
  //             type="radio"
  //             value="RAZORPAY"
  //             checked={paymentMethod === "RAZORPAY"}
  //             onChange={(e) => setPaymentMethod(e.target.value)}
  //           />
  //           Pay Online (Razorpay)
  //         </label>
  //       </div>
  //     </div>

  //     {/* RIGHT SIDE SUMMARY */}
  //     <div className="checkout-right card">
  //       <h3>Order Summary</h3>

  //       {cart.map((item) => (
  //         <div key={item._id} className="summary-item">
  //           <p>
  //             {item.title} x {item.quantity}
  //           </p>
  //           <p>₹{item.price * item.quantity}</p>
  //         </div>
  //       ))}

  //       <hr />

  //       <h2>Total: ₹{total}</h2>

  //       <button className="place-order-btn" onClick={placeOrder}>
  //         Place Order
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">
          {/* ADDRESS SECTION */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">
              Delivery Address
            </h3>

            {addresses.length === 0 && (
              <p className="text-slate-500">
                No saved address. Please add one.
              </p>
            )}

            <div className="space-y-4">
              {addresses.map((addr, index) => (
                <label
                  key={index}
                  className="flex gap-4 p-5 border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-sm transition cursor-pointer"
                >
                  <input
                    type="radio"
                    name="address"
                    onChange={() => setSelectedAddress(addr)}
                    className="mt-1 accent-indigo-600"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {addr.fullName}
                    </p>
                    <p className="text-sm text-slate-600">
                      {addr.addressLine}, {addr.city}, {addr.state} -{" "}
                      {addr.pincode}
                    </p>
                    <p className="text-sm text-slate-500">
                      Mobile: {addr.mobile}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="mt-6 text-indigo-600 font-medium hover:text-indigo-700 transition"
            >
              + Add New Address
            </button>

            {showForm && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.keys(newAddress).map((key) => (
                  <input
                    key={key}
                    type="text"
                    name={key}
                    placeholder={key.replace(/([A-Z])/g, " $1")}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                  />
                ))}

                <div className="sm:col-span-2">
                  <button
                    onClick={addNewAddress}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* PAYMENT SECTION */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">
              Payment Method
            </h3>

            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-indigo-500 transition cursor-pointer">
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-indigo-600"
                />
                <span className="text-slate-700 font-medium">
                  Cash on Delivery
                </span>
              </label>

              <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-indigo-500 transition cursor-pointer">
                <input
                  type="radio"
                  value="RAZORPAY"
                  checked={paymentMethod === "RAZORPAY"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-indigo-600"
                />
                <span className="text-slate-700 font-medium">
                  Pay Online (Razorpay)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 h-fit sticky top-24">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">
            Order Summary
          </h3>

          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-sm text-slate-600"
              >
                <span>
                  {item.title} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 my-6"></div>

          <div className="flex justify-between text-lg font-semibold text-slate-900 mb-6">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
