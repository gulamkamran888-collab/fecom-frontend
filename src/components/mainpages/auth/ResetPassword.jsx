import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authApi from "../../../api/authApi";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    const navigate = useNavigate();
    e.preventDefault();
    try {
      await authApi.put(`/user/reset-password/${token}`, { password });
      alert("Password updated successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={submitHandler}>
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
