import React, { useContext, useEffect, useState } from "react";
import "./AdminOrders.css";
import GlobalState from "../../../GlobalState";
import authApi from "../../../api/authApi";

const AdminOrders = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) getAllOrders();
  }, [token]);

  const getAllOrders = async () => {
    try {
      const res = await authApi.get(`/api/order`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      alert(err.response?.data?.msg || "Cannot load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await authApi.patch(
        `/api/order/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o)),
      );
    } catch (err) {
      alert(err.response?.data?.msg || "Status update failed");
    }
  };

  if (loading) return <h2 className="loading">Loading Orders...</h2>;

  return (
    <div className="admin-orders">
      <h2 className="page-title">All Orders</h2>

      {orders.length === 0 && <p className="no-orders">No orders found</p>}

      <div className="order-list">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <h4>Order #{order._id.slice(-6)}</h4>
              <span className={`status-badge ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <p className="user-info">
              {order.user?.name} ({order.user?.email})
            </p>

            <div className="shipping-address">
              <h4>Shipping Address</h4>
              <p>
                <strong>Name:</strong> {order.shippingAddress?.fullName}
              </p>
              <p>
                <strong>Phone:</strong> {order.shippingAddress?.mobile}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress?.address},{" "}
                {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
                {order.shippingAddress?.pincode},{" "}
                {order.shippingAddress?.country}
              </p>
            </div>

            <p className="date">{new Date(order.createdAt).toLocaleString()}</p>

            <div className="order-products">
              {order.cart.map((item) => (
                <div className="order-item" key={item._id}>
                  <img
                    src={item.images?.url || item.product?.images?.url}
                    alt={item.title}
                  />
                  <div>
                    <p className="item-title">{item.title}</p>
                    <p className="item-price">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <h4>
                Total: ₹
                {order.cart.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0,
                )}
              </h4>

              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
