// import React, { useEffect, useState, useContext } from "react";
// import GlobalState from "../../../GlobalState";
// import "./History.css";
// import authApi from "../../../api/authApi";

// export const History = () => {
//   const state = useContext(GlobalState);
//   const [token] = state.token;
//   const [orders, setOrders] = useState([]);

//   // useEffect(() => {
//   //   if (token) {
//   //     const getHistory = async () => {
//   //       const res = await authApi.get(`/api/history`, {
//   //         headers: { Authorization: token },
//   //       });
//   //       setOrders(res.data);
//   //     };
//   //     getHistory();
//   //   }
//   // }, [token]);
//   useEffect(() => {
//     if (token) {
//       const getHistory = async () => {
//         try {
//           const res = await authApi.get(`/api/history`, {
//             headers: { Authorization: token },
//           });
//           setOrders(res.data);
//         } catch (err) {
//           console.error(err);
//         }
//       };
//       getHistory();
//     }
//   }, [token]);

//   return (
//     <div className="history-page">
//       <h2>My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="no-orders">No orders yet. Start shopping now! 🛒</p>
//       ) : (
//         orders.map((order) => (
//           <div className="order-card" key={order._id}>
//             <div className="order-header">
//               <span className="order-id">Order ID: {order._id}</span>
//               <span className={`order-status status-${order.status}`}>
//                 {order.status}
//               </span>
//             </div>

//             <div className="order-total">Total: ₹{order.total}</div>

//             <div className="order-items">
//               {order.cart.map((item) => (
//                 <div className="order-item" key={item._id}>
//                   <div className="item-info">
//                     <img
//                       src={item.images?.url || "/no-image.png"}
//                       alt={item.title}
//                     />
//                     <span>{item.title}</span>
//                   </div>
//                   <span className="item-quantity">
//                     {item.quantity} × ₹{item.price}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default History;

import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import GlobalState from "../../../GlobalState";
import "./History.css";
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

  return (
    <div className="history-page">
      <h2>My Orders</h2>

      {loading ? (
        <p className="loading">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="no-orders">No orders yet. Start shopping now!</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <div>
                <p className="order-id">Order ID: {order._id}</p>
                <p className="order-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`order-status status-${order.status?.toLowerCase()}`}
              >
                {order.status}
              </span>
            </div>

            <div className="order-info">
              <p>
                <strong>Total:</strong> ₹{order.total}
              </p>

              <p>
                <strong>Payment:</strong>
                <span
                  className={`payment-badge payment-${order.paymentStatus?.toLowerCase()}`}
                >
                  {order.paymentStatus}
                </span>
              </p>

              <p>
                <strong>Delivery:</strong>
                <span
                  className={`delivery-badge delivery-${order.deliveryStatus?.toLowerCase()}`}
                >
                  {order.deliveryStatus}
                </span>
              </p>
            </div>

            <div className="order-items">
              {order.cart.map((item) => (
                <div className="order-item" key={item._id}>
                  <img
                    src={item.images?.url || "/no-image.png"}
                    alt={item.title}
                  />
                  <div>
                    <p>{item.title}</p>
                    <p>
                      {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-actions">
              <Link to={`/order/${order._id}`} className="details-btn">
                View Details
              </Link>

              {order.status === "Pending" && (
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(order._id)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
