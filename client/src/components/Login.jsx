import axios from "axios";
import React, { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = await axios.post(
        "http://localhost:8080/api/auth/signin",
        formData
      );
      if (data.data.message === "success") {
        localStorage.setItem("id", data.data.id);
        alert("login success");
        navigate("/");
      } else {
        alert("Invalid Crediential , Try Again");
      }
      // navigate("/verifyId");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
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
