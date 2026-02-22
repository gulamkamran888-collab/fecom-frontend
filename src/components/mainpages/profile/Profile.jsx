import React, { useContext, useEffect, useState } from "react";

import GlobalState from "../../../GlobalState";
import authApi from "../../../api/authApi";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [isLogged, setIsLogged] = state.userAPI.isLogged;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      authApi
        .get(`/user/info`, { headers: { Authorization: token } })
        .then((res) =>
          setUser({ ...user, name: res.data.name, email: res.data.email }),
        )
        .catch(() => alert("Please login"));
    }
    // eslint-disable-next-line
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      await authApi.put(
        `/user/profile`,
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        { headers: { Authorization: token } },
      );
      alert("Profile Updated Successfully");
      setUser({ ...user, password: "" });
    } catch (err) {
      alert(err.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    await authApi.get(`/user/logout`, { withCredentials: true });
    localStorage.clear();
    setIsLogged(false);
    navigate("/login");
  };

  // return (
  //   <div className="profile-container">
  //     <div className="profile-card">
  //       <h2>My Profile</h2>

  //       <div className="input-group">
  //         <label>Name</label>
  //         <input
  //           type="text"
  //           name="name"
  //           value={user.name}
  //           onChange={handleChange}
  //         />
  //       </div>

  //       <div className="input-group">
  //         <label>Email</label>
  //         <input
  //           type="email"
  //           name="email"
  //           value={user.email}
  //           onChange={handleChange}
  //         />
  //       </div>

  //       <div className="input-group">
  //         <label>New Password</label>
  //         <input
  //           type="password"
  //           name="password"
  //           placeholder="Leave blank if not changing"
  //           value={user.password}
  //           onChange={handleChange}
  //         />
  //       </div>

  //       <div className="profile-actions">
  //         <button
  //           className="update-btn"
  //           onClick={updateProfile}
  //           disabled={loading}
  //         >
  //           {loading ? "Updating..." : "Update Profile"}
  //         </button>

  //         <button className="logout-btn" onClick={logoutUser}>
  //           Logout
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
    <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

      {/* TITLE */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">
          My Profile
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Manage your account information
        </p>
      </div>

      <div className="space-y-6">

        {/* NAME */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Leave blank if not changing"
            value={user.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">

          <button
            onClick={updateProfile}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

          <button
            onClick={logoutUser}
            className="flex-1 py-3 rounded-xl border border-red-300 text-red-600 font-medium hover:bg-red-50 transition"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  </div>
);
}

export default Profile;
