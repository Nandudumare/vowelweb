import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await axios.post(
        "http://localhost:8080/api/auth/signup",
        formData
      );
      alert("Email sent successfully");
      navigate("/verifyId");
    } catch (err) {
      console.log(err);
      alert("user already exists");
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          onChange={handleChange}
        />
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
