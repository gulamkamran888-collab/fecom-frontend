import React, { useContext, useEffect, useState } from "react";
// import GlobalState from "../../../GlobalState";
import authApi from "../../../api/authApi";
import "./Checkout.css";
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

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        {/* ADDRESS */}
        <div className="card">
          <h3>Delivery Address</h3>

          {addresses.length === 0 && <p>No saved address. Please add one.</p>}

          {addresses.map((addr, index) => (
            <label key={index} className="address-box">
              <input
                type="radio"
                name="address"
                onChange={() => setSelectedAddress(addr)}
              />
              <div>
                <strong>{addr.fullName}</strong>
                <p>
                  {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p>Mobile: {addr.mobile}</p>
              </div>
            </label>
          ))}

          <button
            className="add-address-btn"
            onClick={() => setShowForm(!showForm)}
          >
            + Add New Address
          </button>

          {showForm && (
            <div className="address-form">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                onChange={handleChange}
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                onChange={handleChange}
              />
              <input
                type="text"
                name="addressLine"
                placeholder="Address Line"
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                onChange={handleChange}
              />
              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                onChange={handleChange}
              />

              <button onClick={addNewAddress}>Save Address</button>
            </div>
          )}
        </div>

        {/* PAYMENT */}
        <div className="card">
          <h3>Payment Method</h3>

          <label className="payment-option">
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label className="payment-option">
            <input
              type="radio"
              value="RAZORPAY"
              checked={paymentMethod === "RAZORPAY"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Pay Online (Razorpay)
          </label>
        </div>
      </div>

      {/* RIGHT SIDE SUMMARY */}
      <div className="checkout-right card">
        <h3>Order Summary</h3>

        {cart.map((item) => (
          <div key={item._id} className="summary-item">
            <p>
              {item.title} x {item.quantity}
            </p>
            <p>₹{item.price * item.quantity}</p>
          </div>
        ))}

        <hr />

        <h2>Total: ₹{total}</h2>

        <button className="place-order-btn" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
