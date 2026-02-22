import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authApi from "../../../api/authApi";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate(); // ✅ Correct place

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      await authApi.put(`/user/reset-password/${token}`, { password });
      alert("Password updated successfully ✅");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="login-container">
  //     <form className="login-card" onSubmit={submitHandler}>
  //       <h2>Reset Password</h2>

  //       <input
  //         type="password"
  //         placeholder="Enter new password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         required
  //       />

  //       <button type="submit" disabled={loading}>
  //         {loading ? "Updating..." : "Reset Password"}
  //       </button>
  //     </form>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={submitHandler}
          className="bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl px-8 py-10 border border-gray-100 transition-all duration-300 hover:shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
              Reset Password
            </h2>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              Enter your new password below to secure your account.
            </p>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900 outline-none transition-all duration-200"
            />
            <p className="mt-2 text-xs text-gray-400">
              Must be at least 6 characters.
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3 text-sm font-medium text-white shadow-md transition-all duration-300 active:scale-[0.98]
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-900 hover:bg-black hover:shadow-lg"
            }`}
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Remembered your password?{" "}
            <a
              href="/login"
              className="text-gray-700 hover:text-black font-medium transition-colors"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
