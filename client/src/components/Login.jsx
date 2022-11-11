import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  useEffect(() => {
    let id = localStorage.getItem("id");

    if (id) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = await axios.post(
        "http://localhost:8080/api/auth/signin",
        formData
      );
      console.log("data:", data);
      if (data.data.message === "success") {
        localStorage.setItem("id", data.data.id);
        alert("login success");
        navigate("/");
      } else if (data.data.message === "Not Found") {
        alert("User not Exists");
      } else {
        alert("Invalid Crediential or Email not Verified");
      }
      // navigate("/verifyId");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <h2 style={{ textAlign: "center" }}>Login Form</h2>
      <form className="regForm" action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          name="password"
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
