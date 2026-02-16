// import React, { useContext, useEffect, useState } from "react";
// import "./AdminDashboard.css";
// import GlobalState from "../../../GlobalState";
// import authApi from "../../../api/authApi";

// function AdminDashboard() {
//   const state = useContext(GlobalState);
//   const [token] = state.token;

//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalUsers: 0,
//     totalProducts: 0,
//     totalRevenue: 0,
//     recentOrders: [],
//   });

//   useEffect(() => {
//     if (!token) return; // 🔥 VERY IMPORTANT
//     getStats();
//   }, [token]);

//   const getStats = async () => {
//     try {
//       const res = await authApi.get(`/api/dashboard/stats`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setStats(res.data);
//     } catch (err) {
//       console.log(err.response?.data);
//       alert("Cannot load dashboard");
//     }
//   };

//   if (!stats) return <h2>Loading...</h2>;

//   return (
//     <div className="admin-dashboard">
//       <h2>Admin Dashboard</h2>

//       <div className="stats-grid">
//         <div className="card">
//           <h3>{stats.totalOrders}</h3>
//           <p>Total Orders</p>
//         </div>

//         <div className="card">
//           <h3>{stats.totalUsers}</h3>
//           <p>Total Users</p>
//         </div>

//         <div className="card">
//           <h3>{stats.totalProducts}</h3>
//           <p>Total Products</p>
//         </div>

//         <div className="card">
//           <h3>₹ {stats.totalRevenue}</h3>
//           <p>Total Revenue</p>
//         </div>
//       </div>

//       <div className="recent-orders">
//         <h3>Recent Orders</h3>

//         {stats.recentOrders?.map((o) => (
//           <div className="order-row" key={o._id}>
//             <span>{o.user?.name || "Guest"}</span>
//             <span>₹ {o.total}</span>
//             <span>{new Date(o.createdAt).toLocaleDateString()}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useContext, useEffect, useState } from "react";
import "./AdminDashboard.css";
import GlobalState from "../../../GlobalState";
import authApi from "../../../api/authApi";

function AdminDashboard() {
  const state = useContext(GlobalState);
  const [token] = state.token;

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    getStats();
  }, [token]);

  const getStats = async () => {
    try {
      const res = await authApi.get(`/api/dashboard/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(res.data);
    } catch (err) {
      console.log(err.response?.data);
      alert("Cannot load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2 className="loading">Loading Dashboard...</h2>;

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="stats-grid">
        <div className="card">
          <h3>{stats.totalOrders}</h3>
          <p>Total Orders</p>
        </div>

        <div className="card">
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>

        <div className="card">
          <h3>{stats.totalProducts}</h3>
          <p>Total Products</p>
        </div>

        <div className="card revenue">
          <h3>₹ {stats.totalRevenue}</h3>
          <p>Total Revenue</p>
        </div>
      </div>

      <div className="recent-orders">
        <h3>Recent Orders</h3>

        <div className="orders-header">
          <span>User</span>
          <span>Amount</span>
          <span>Date</span>
        </div>

        {stats.recentOrders?.length === 0 ? (
          <p className="no-orders">No recent orders</p>
        ) : (
          stats.recentOrders?.map((o) => (
            <div className="order-row" key={o._id}>
              <span>{o.user?.name || "Guest"}</span>
              <span>₹ {o.total}</span>
              <span>{new Date(o.createdAt).toLocaleDateString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
