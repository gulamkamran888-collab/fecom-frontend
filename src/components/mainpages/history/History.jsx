import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import GlobalState from "../../../GlobalState";

import authApi from "../../../api/authApi";

export const History = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        try {
          setLoading(true);
          const res = await authApi.get(`/api/history`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setOrders(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      getHistory();
    }
  }, [token]);

  const handleCancel = async (id) => {
    try {
      await authApi.patch(
        `/api/order/cancel/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "Cancelled" } : order,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  // return (
  //   <div className="history-page">
  //     <h2>My Orders</h2>

  //     {loading ? (
  //       <p className="loading">Loading orders...</p>
  //     ) : orders.length === 0 ? (
  //       <p className="no-orders">No orders yet. Start shopping now!</p>
  //     ) : (
  //       orders.map((order) => (
  //         <div className="order-card" key={order._id}>
  //           <div className="order-header">
  //             <div>
  //               <p className="order-id">Order ID: {order._id}</p>
  //               <p className="order-date">
  //                 {new Date(order.createdAt).toLocaleDateString()}
  //               </p>
  //             </div>

  //             <span
  //               className={`order-status status-${order.status?.toLowerCase()}`}
  //             >
  //               {order.status}
  //             </span>
  //           </div>

  //           <div className="order-info">
  //             <p>
  //               <strong>Total:</strong> ₹{order.total}
  //             </p>

  //             <p>
  //               <strong>Payment:</strong>
  //               <span
  //                 className={`payment-badge payment-${order.paymentStatus?.toLowerCase()}`}
  //               >
  //                 {order.paymentStatus}
  //               </span>
  //             </p>

  //             <p>
  //               <strong>Delivery:</strong>
  //               <span
  //                 className={`delivery-badge delivery-${order.deliveryStatus?.toLowerCase()}`}
  //               >
  //                 {order.deliveryStatus}
  //               </span>
  //             </p>
  //           </div>

  //           <div className="order-items">
  //             {order.cart.map((item) => (
  //               <div className="order-item" key={item._id}>
  //                 <img
  //                   src={item.images?.url || "/no-image.png"}
  //                   alt={item.title}
  //                 />
  //                 <div>
  //                   <p>{item.title}</p>
  //                   <p>
  //                     {item.quantity} × ₹{item.price}
  //                   </p>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>

  //           <div className="order-actions">
  //             <Link to={`/order/${order._id}`} className="details-btn">
  //               View Details
  //             </Link>

  //             {order.status === "Pending" && (
  //               <button
  //                 className="cancel-btn"
  //                 onClick={() => handleCancel(order._id)}
  //               >
  //                 Cancel Order
  //               </button>
  //             )}
  //           </div>
  //         </div>
  //       ))
  //     )}
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">
          My Orders
        </h2>

        {loading ? (
          <p className="text-slate-600">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
            <p className="text-slate-600">No orders yet. Start shopping now!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition p-6"
              >
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-sm text-slate-500">
                      Order ID: {order._id}
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* ORDER INFO */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-sm">
                  <div>
                    <p className="text-slate-500">Total</p>
                    <p className="font-semibold text-slate-900">
                      ₹{order.total}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Payment</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>

                  <div>
                    <p className="text-slate-500">Delivery</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        order.deliveryStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.deliveryStatus}
                    </span>
                  </div>
                </div>

                {/* ITEMS */}
                <div className="mt-6 space-y-4">
                  {order.cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl"
                    >
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.images?.url || "/no-image.png"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="font-medium text-slate-900">
                          {item.title}
                        </p>
                        <p className="text-sm text-slate-600">
                          {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ACTIONS */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Link
                    to={`/order/${order._id}`}
                    className="px-6 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-indigo-600 transition shadow-sm"
                  >
                    View Details
                  </Link>

                  {order.status === "Pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="px-6 py-2 rounded-xl border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50 transition"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
