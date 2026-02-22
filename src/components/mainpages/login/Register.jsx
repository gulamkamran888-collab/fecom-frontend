import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import publicApi from "../../../api/publicApi";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await publicApi.post(`/user/register`, { ...user });

      localStorage.setItem("firstRegister", true);

      alert(res.data.msg);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.msg || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="register-container">
  //     <form className="register-card" onSubmit={registerSubmit}>
  //       <h2 className="register-title">Create Account 🚀</h2>
  //       <p className="register-subtitle">Join us and start shopping</p>

  //       <div className="input-group">
  //         <label>Full Name</label>
  //         <input
  //           type="text"
  //           name="name"
  //           required
  //           placeholder="Enter your full name"
  //           value={user.name}
  //           onChange={onChangeInput}
  //         />
  //       </div>

  //       <div className="input-group">
  //         <label>Email Address</label>
  //         <input
  //           type="email"
  //           name="email"
  //           required
  //           placeholder="Enter your email"
  //           value={user.email}
  //           onChange={onChangeInput}
  //         />
  //       </div>

  //       <div className="input-group">
  //         <label>Password</label>
  //         <input
  //           type="password"
  //           name="password"
  //           required
  //           placeholder="Enter a secure password"
  //           value={user.password}
  //           onChange={onChangeInput}
  //         />
  //       </div>

  //       <button type="submit" className="register-btn" disabled={loading}>
  //         {loading ? "Creating Account..." : "Register"}
  //       </button>

  //       <div className="register-footer">
  //         <span>Already have an account?</span>
  //         <Link to="/login" className="login-link">
  //           Login
  //         </Link>
  //       </div>
  //     </form>
  //   </div>
  // );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200 p-8">
        {/* TITLE */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Create Account 🚀
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Join us and start shopping
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={registerSubmit} className="space-y-6">
          {/* FULL NAME */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your full name"
              value={user.name}
              onChange={onChangeInput}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              value={user.email}
              onChange={onChangeInput}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter a secure password"
              value={user.password}
              onChange={onChangeInput}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          {/* FOOTER */}
          <div className="text-center text-sm text-slate-600 pt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:text-indigo-700"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
