import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import publicApi from "../../../api/publicApi";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicApi.post(`/user/register`, {
        ...user,
      });
      localStorage.setItem("firstRegister", true);
      window.location.href = "/login";
    } catch (error) {
      alert(error.response?.data?.msg || "Register failed");
    }
  };

  return (
    <div className="register-container">
      <form className="register-card" onSubmit={registerSubmit}>
        <h2>Create Account 🚀</h2>
        <p>Join us and start shopping</p>

        <input
          type="text"
          name="name"
          required
          placeholder="Full Name"
          value={user.name}
          onChange={onChangeInput}
        />

        <input
          type="email"
          name="email"
          required
          placeholder="Email Address"
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

        <button type="submit">Register</button>

        <div className="register-footer">
          <span>Already have an account?</span>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
