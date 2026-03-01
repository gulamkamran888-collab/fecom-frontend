import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalState from "../../../GlobalState";
import publicApi from "../../../api/publicApi";

function Login() {
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const [, setToken] = state.token;

  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError("");
  };

  const loginSubmit = async (e) => {
    e.preventDefault();

    if (!user.email) {
      setError("Email is required");
      return;
    }

    // ✅ Proper Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(user.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!user.password) {
      setError("Password is required");
      return;
    }

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

      navigate(res.data.user.role === 1 ? "/admin/dashboard" : "/");
    } catch (error) {
      setError(error.response?.data?.msg || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Welcome Back 👋</h2>
          <p className="text-slate-500 text-sm mt-2">Login to your account</p>
        </div>

        <form onSubmit={loginSubmit} className="space-y-6">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>
            {/* <input
              type="email"
              name="email"
              value={user.email}
              onChange={onChangeInput}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            /> */}
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={onChangeInput}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-xl border 
  ${error.toLowerCase().includes("email") ? "border-red-500" : "border-slate-300"}
  focus:ring-2 focus:ring-indigo-500 outline-none transition`}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={onChangeInput}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none pr-14 transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[42px] text-sm text-indigo-600 font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-100 text-red-600 text-sm py-2 px-4 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* REGISTER LINK */}
          <div className="text-center text-sm text-slate-600 pt-4">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
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
