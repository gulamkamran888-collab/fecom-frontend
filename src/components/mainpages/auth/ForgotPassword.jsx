// import React, { useState } from "react";
// import authApi from "../../../api/authApi";

// function ForgotPassword() {
//   const [email, setEmail] = useState("");

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await authApi.post(`/user/forgot-password`, { email });
//       alert(res.data.msg);
//     } catch (err) {
//       alert(err.response?.data?.msg);
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-card" onSubmit={submitHandler}>
//         <h2>Forgot Password</h2>

//         <input
//           type="email"
//           placeholder="Enter registered email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <button type="submit">Send Reset Link</button>
//       </form>
//     </div>
//   );
// }

// export default ForgotPassword;

import React, { useState } from "react";
import authApi from "../../../api/authApi";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.post(`/user/forgot-password`, { email });
      alert(res.data.msg);
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="forgot-container">
      <form className="forgot-card" onSubmit={submitHandler}>
        <h2>Forgot Password 🔒</h2>
        <p>Enter your registered email to receive a reset link.</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="btn-submit">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
