import React, { useState } from "react";
import authApi from "../../../api/authApi";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address",
      });
      return;
    }

    try {
      const res = await authApi.post(`/user/forgot-password`, { email });

      await Swal.fire({
        icon: "success",
        title: "Email Sent 📩",
        text: res.data.msg,
        confirmButtonColor: "#6366f1",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: err.response?.data?.msg || "Something went wrong",
      });
    }
  };

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
              Forgot Password
            </h2>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              Enter your registered email and we’ll send you a secure reset
              link.
            </p>
          </div>

          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900 outline-none transition-all duration-200"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gray-900 text-white py-3 text-sm font-medium shadow-md hover:shadow-lg hover:bg-black transition-all duration-300 active:scale-[0.98]"
          >
            Send Reset Link
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Remember your password?{" "}
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

export default ForgotPassword;
