import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import GlobalState from "../../../GlobalState";
import authApi from "../../../api/authApi";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [isLogged, setIsLogged] = state.userAPI.isLogged;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      authApi
        .get(`/user/info`, {
          headers: { Authorization: token },
        })
        .then((res) =>
          setUser({ ...user, name: res.data.name, email: res.data.email }),
        )
        .catch(() => alert("Please login"));
    }
    // eslint-disable-next-line
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const updateProfile = async () => {
    try {
      await authApi.put(
        `/user/profile`,
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        {
          headers: { Authorization: token },
        },
      );

      alert("Profile Updated Successfully");
      setUser({ ...user, password: "" }); // password clear
    } catch (err) {
      alert(err.response?.data?.msg);
    }
  };

  const logoutUser = async () => {
    await authApi.get(`/user/logout`, { withCredentials: true });
    localStorage.clear();
    setIsLogged(false);
    // window.location.href = "/login";
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <label>Name</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />

      <label>New Password</label>
      <input
        type="password"
        name="password"
        placeholder="Leave blank if not changing"
        value={user.password}
        onChange={handleChange}
      />

      <button onClick={updateProfile}>Update Profile</button>

      <button className="logout-btn" onClick={logoutUser}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
