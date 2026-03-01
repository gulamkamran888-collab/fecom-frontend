import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import publicApi from "../../../api/publicApi";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // 🔐 PASSWORD STRENGTH CHECKER
  const passwordStrength = useMemo(() => {
    const { password } = user;

    if (!password) return "";

    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    if (password.length < 6) return "Weak";
    if (password.length >= 6 && (hasUpper || hasNumber)) return "Medium";
    if (password.length >= 8 && hasUpper && hasNumber && hasSpecial)
      return "Strong";

    return "Weak";
  }, [user.password]);

  const passwordsMatch =
    user.confirmPassword && user.password === user.confirmPassword;

  // const registerSubmit = async (e) => {
  //   e.preventDefault();

  //   if (user.password !== user.confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await publicApi.post(`/user/register`, {
  //       name: user.name,
  //       email: user.email,
  //       password: user.password,
  //     });

  //     localStorage.setItem("firstRegister", true);

  //     alert(res.data.msg);
  //     navigate("/login");
  //   } catch (error) {
  //     alert(error.response?.data?.msg || "Register failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const registerSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Password Mismatch",
        text: "Passwords do not match",
      });
      return;
    }

    try {
      setLoading(true);

      Swal.fire({
        title: "Creating Account...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await publicApi.post(`/user/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
      });

      Swal.close();

      localStorage.setItem("firstRegister", true);

      await Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: res.data.msg || "Account created successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed ❌",
        text: error.response?.data?.msg || "Register failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const strengthColor =
    passwordStrength === "Weak"
      ? "text-red-500"
      : passwordStrength === "Medium"
        ? "text-yellow-500"
        : "text-green-600";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Create Account 🚀
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Join us and start shopping
          </p>
        </div>

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
              value={user.name}
              onChange={onChangeInput}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
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
              value={user.email}
              onChange={onChangeInput}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={user.password}
                onChange={onChangeInput}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-slate-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Strength Indicator */}
            {passwordStrength && (
              <p className={`text-sm mt-2 font-medium ${strengthColor}`}>
                Strength: {passwordStrength}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={user.confirmPassword}
                onChange={onChangeInput}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-sm text-slate-500"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Match Indicator */}
            {user.confirmPassword && (
              <p
                className={`text-sm mt-2 font-medium ${
                  passwordsMatch ? "text-green-600" : "text-red-500"
                }`}
              >
                {passwordsMatch
                  ? "Passwords Match ✅"
                  : "Passwords Do Not Match ❌"}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

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
