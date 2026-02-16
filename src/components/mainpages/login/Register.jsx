// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Register.css";
// import publicApi from "../../../api/publicApi";

// function Register() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const onChangeInput = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const registerSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await publicApi.post(`/user/register`, {
//         ...user,
//       });
//       localStorage.setItem("firstRegister", true);
//       navigate("/login");
//     } catch (error) {
//       alert(error.response?.data?.msg || "Register failed");
//     }
//   };

//   return (
//     <div className="register-container">
//       <form className="register-card" onSubmit={registerSubmit}>
//         <h2>Create Account 🚀</h2>
//         <p>Join us and start shopping</p>

//         <input
//           type="text"
//           name="name"
//           required
//           placeholder="Full Name"
//           value={user.name}
//           onChange={onChangeInput}
//         />

//         <input
//           type="email"
//           name="email"
//           required
//           placeholder="Email Address"
//           value={user.email}
//           onChange={onChangeInput}
//         />

//         <input
//           type="password"
//           name="password"
//           required
//           placeholder="Password"
//           value={user.password}
//           onChange={onChangeInput}
//         />

//         <button type="submit">Register</button>

//         <div className="register-footer">
//           <span>Already have an account?</span>
//           <Link to="/login">Login</Link>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import publicApi from "../../../api/publicApi";
import "./Register.css";

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

  return (
    <div className="register-container">
      <form className="register-card" onSubmit={registerSubmit}>
        <h2 className="register-title">Create Account 🚀</h2>
        <p className="register-subtitle">Join us and start shopping</p>

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your full name"
            value={user.name}
            onChange={onChangeInput}
          />
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            value={user.email}
            onChange={onChangeInput}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="Enter a secure password"
            value={user.password}
            onChange={onChangeInput}
          />
        </div>

        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>

        <div className="register-footer">
          <span>Already have an account?</span>
          <Link to="/login" className="login-link">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
