import React, { useContext, useEffect, useState } from "react";

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

  // if (loading) return <h2 className="loading">Loading Orders...</h2>;

  // return (
  //   <div className="admin-orders">
  //     <h2 className="page-title">All Orders</h2>

  //     {orders.length === 0 && <p className="no-orders">No orders found</p>}

  //     <div className="order-list">
  //       {orders.map((order) => (
  //         <div className="order-card" key={order._id}>
  //           <div className="order-header">
  //             <h4>Order #{order._id.slice(-6)}</h4>
  //             <span className={`status-badge ${order.status.toLowerCase()}`}>
  //               {order.status}
  //             </span>
  //           </div>
  //           <p className="user-info">
  //             {order.user?.name} ({order.user?.email})
  //           </p>

  //           <div className="shipping-address">
  //             <h4>Shipping Address</h4>
  //             <p>
  //               <strong>Name:</strong> {order.shippingAddress?.fullName}
  //             </p>
  //             <p>
  //               <strong>Phone:</strong> {order.shippingAddress?.mobile}
  //             </p>
  //             <p>
  //               <strong>Address:</strong> {order.shippingAddress?.address},{" "}
  //               {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
  //               {order.shippingAddress?.pincode},{" "}
  //               {order.shippingAddress?.country}
  //             </p>
  //           </div>

  //           <p className="date">{new Date(order.createdAt).toLocaleString()}</p>

  //           <div className="order-products">
  //             {order.cart.map((item) => (
  //               <div className="order-item" key={item._id}>
  //                 <img
  //                   src={item.images?.url || item.product?.images?.url}
  //                   alt={item.title}
  //                 />
  //                 <div>
  //                   <p className="item-title">{item.title}</p>
  //                   <p className="item-price">
  //                     ₹{item.price} × {item.quantity}
  //                   </p>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>

  //           <div className="order-footer">
  //             <h4>
  //               Total: ₹
  //               {order.cart.reduce(
  //                 (sum, item) => sum + item.price * item.quantity,
  //                 0,
  //               )}
  //             </h4>

  //             <select
  //               value={order.status}
  //               onChange={(e) => updateStatus(order._id, e.target.value)}
  //             >
  //               <option value="Pending">Pending</option>
  //               <option value="Shipped">Shipped</option>
  //               <option value="Delivered">Delivered</option>
  //             </select>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg animate-pulse">Loading Orders...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            Orders
          </h2>
          <p className="mt-2 text-gray-500 text-sm sm:text-base">
            Manage and track all customer orders
          </p>
        </div>

        {orders.length === 0 && (
          <div className="bg-white shadow-sm rounded-2xl p-10 text-center">
            <p className="text-gray-500 text-lg">No orders found</p>
          </div>
        )}

        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-gray-100">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Order #{order._id.slice(-6)}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize
                  ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Body */}
              <div className="px-6 py-6 grid md:grid-cols-2 gap-8">
                {/* Customer + Shipping */}
                <div className="space-y-5">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Customer
                    </h5>
                    <p className="mt-2 text-gray-900 font-medium">
                      {order.user?.name}
                    </p>
                    <p className="text-gray-500 text-sm">{order.user?.email}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Shipping Address
                    </h5>
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      <p>{order.shippingAddress?.fullName}</p>
                      <p>{order.shippingAddress?.mobile}</p>
                      <p>
                        {order.shippingAddress?.address},{" "}
                        {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.state} -{" "}
                        {order.shippingAddress?.pincode}
                      </p>
                      <p>{order.shippingAddress?.country}</p>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div>
                  <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                    Items
                  </h5>

                  <div className="space-y-4">
                    {order.cart.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-4 bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors"
                      >
                        <img
                          src={item.images?.url || item.product?.images?.url}
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded-lg border"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Total: ₹
                  {order.cart.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0,
                  )}
                </h4>

                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="w-full sm:w-auto bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-gray-900 focus:outline-none transition"
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
    </div>
  );
};

export default AdminOrders;
