import React, { useContext, useEffect, useState } from "react";

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

  // return (
  //   <div className="admin-dashboard">
  //     <h2 className="dashboard-title">Admin Dashboard</h2>

  //     <div className="stats-grid">
  //       <div className="card">
  //         <h3>{stats.totalOrders}</h3>
  //         <p>Total Orders</p>
  //       </div>

  //       <div className="card">
  //         <h3>{stats.totalUsers}</h3>
  //         <p>Total Users</p>
  //       </div>

  //       <div className="card">
  //         <h3>{stats.totalProducts}</h3>
  //         <p>Total Products</p>
  //       </div>

  //       <div className="card revenue">
  //         <h3>₹ {stats.totalRevenue}</h3>
  //         <p>Total Revenue</p>
  //       </div>
  //     </div>

  //     <div className="recent-orders">
  //       <h3>Recent Orders</h3>

  //       <div className="orders-header">
  //         <span>User</span>
  //         <span>Amount</span>
  //         <span>Date</span>
  //       </div>

  //       {stats.recentOrders?.length === 0 ? (
  //         <p className="no-orders">No recent orders</p>
  //       ) : (
  //         stats.recentOrders?.map((o) => (
  //           <div className="order-row" key={o._id}>
  //             <span>{o.user?.name || "Guest"}</span>
  //             <span>₹ {o.total}</span>
  //             <span>{new Date(o.createdAt).toLocaleDateString()}</span>
  //           </div>
  //         ))
  //       )}
  //     </div>
  //   </div>
  // );

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-slate-600 text-lg">Loading Dashboard...</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* TITLE */}
      <h2 className="text-2xl font-bold text-slate-800 mb-10">
        Admin Dashboard
      </h2>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Orders */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-3xl font-bold text-indigo-600">
            {stats.totalOrders}
          </h3>
          <p className="text-slate-500 mt-2 text-sm">Total Orders</p>
        </div>

        {/* Users */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-3xl font-bold text-emerald-600">
            {stats.totalUsers}
          </h3>
          <p className="text-slate-500 mt-2 text-sm">Total Users</p>
        </div>

        {/* Products */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-3xl font-bold text-amber-600">
            {stats.totalProducts}
          </h3>
          <p className="text-slate-500 mt-2 text-sm">Total Products</p>
        </div>

        {/* Revenue */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-3xl font-bold text-rose-600">
            ₹ {stats.totalRevenue}
          </h3>
          <p className="text-slate-500 mt-2 text-sm">Total Revenue</p>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">
          Recent Orders
        </h3>

        <div className="hidden md:grid grid-cols-3 text-xs uppercase text-slate-500 mb-4 px-2">
          <span>User</span>
          <span>Amount</span>
          <span>Date</span>
        </div>

        {stats.recentOrders?.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-6">
            No recent orders
          </p>
        ) : (
          <div className="space-y-3">
            {stats.recentOrders?.map((o) => (
              <div
                key={o._id}
                className="grid grid-cols-1 md:grid-cols-3 items-center bg-slate-50 rounded-lg px-4 py-3 text-sm"
              >
                <span className="font-medium text-slate-700">
                  {o.user?.name || "Guest"}
                </span>

                <span className="text-indigo-600 font-semibold">
                  ₹ {o.total}
                </span>

                <span className="text-slate-500">
                  {new Date(o.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
