import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalState from "../../../GlobalState";
import publicApi from "../../../api/publicApi";

function Login() {
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const [, setToken] = state.token;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await publicApi.post(
        `/user/login`,
        { ...user },
        { withCredentials: true },
      );

      localStorage.setItem("firstLogin", true);
      localStorage.setItem("accessToken", res.data.accesstoken);
      setToken(res.data.accesstoken);

      if (res.data.user.role === 1) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="login-container">
  //     <form className="login-card" onSubmit={loginSubmit}>
  //       <h2 className="login-title">Welcome Back 👋</h2>
  //       <p className="login-subtitle">Login to continue shopping</p>

  //       <div className="input-group">
  //         <label>Email</label>
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
  //           placeholder="Enter your password"
  //           value={user.password}
  //           onChange={onChangeInput}
  //         />
  //       </div>

  //       <div className="forgot-password">
  //         <Link to="/forgot-password">Forgot Password?</Link>
  //       </div>

  //       <button type="submit" className="login-btn" disabled={loading}>
  //         {loading ? "Logging in..." : "Login"}
  //       </button>

  //       <div className="login-footer">
  //         <span>New here?</span>
  //         <Link to="/register" className="register-link">
  //           Create Account
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
            Welcome Back 👋
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Login to continue shopping
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={loginSubmit} className="space-y-6">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
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
              placeholder="Enter your password"
              value={user.password}
              onChange={onChangeInput}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* FOOTER */}
          <div className="text-center text-sm text-slate-600 pt-4">
            New here?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:text-indigo-700"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
