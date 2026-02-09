import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useContext } from "react";
import GlobalState from "../../../GlobalState";
import publicApi from "../../../api/publicApi";

function Login() {
  const state = useContext(GlobalState);
  const [, setToken] = state.token;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await publicApi.post(`/user/login`, { ...user });
      localStorage.setItem("firstLogin", true);
      localStorage.setItem("token", res.data.accesstoken);
      setToken(res.data.accesstoken);

      if (res.data.user.role === 1) {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      alert(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={loginSubmit}>
        <h2>Welcome Back 👋</h2>
        <p>Login to continue shopping</p>

        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />
        <Link to="/forgot-password">Forgot Password?</Link>

        <button type="submit">Login</button>

        <div className="login-footer">
          <span>New here?</span>
          <Link to="/register">Create Account</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
